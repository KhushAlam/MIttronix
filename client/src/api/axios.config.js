import axios from 'axios'

// Base URL can be provided with VITE_API_BASE_URL. If not provided, use relative '/api' so
// the Vite dev server proxy can forward requests to a local backend during development.
let apiBase = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL
  ? String(import.meta.env.VITE_API_BASE_URL)
  : '/api'

// Normalize remote base: if user provided a full host (https://...), ensure it points to the API
if (apiBase !== '/api') {
  // remove trailing slash
  apiBase = apiBase.replace(/\/+$/, '')
  // if it doesn't already point to /api, append it
  if (!apiBase.endsWith('/api')) {
    apiBase = `${apiBase}/api`
  }
}

export const instance = axios.create({
  baseURL: apiBase,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
})

// Request logger for debugging
instance.interceptors.request.use(config => {
  console.log(`API Request -> ${config.method?.toUpperCase() || 'GET'} ${config.url} (base: ${instance.defaults.baseURL}) (timeout: ${config.timeout}ms)`)
  return config
})

// Add a simple response interceptor to surface network errors with clearer logs
instance.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      // Network or CORS error
      console.error('Network or CORS error when calling API:', error.message)
    } else {
      console.warn('API response error:', error.response.status, error.response?.data)
    }
    return Promise.reject(error)
  }
)

// Create a local instance that targets the dev proxy (/api)
const localInstance = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
})

// Small helper to retry requests on network errors or timeouts
// Create a direct backend instance (bypass Vite proxy) to call the mock server directly if proxy returns 502
const directBase = (typeof window !== 'undefined'
  ? `${window.location.protocol}//${window.location.hostname}:3000/api`
  : 'http://localhost:3000/api')

const directInstance = axios.create({
  baseURL: directBase,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
})

export async function requestWithRetry(config, retries = 2, backoff = 300) {
  let attempt = 0
  while (attempt <= retries) {
    try {
      return await instance.request(config)
    } catch (err) {
      const isNetworkError = !err.response
      const isTimeout = err.code === 'ECONNABORTED' || err.message?.toLowerCase().includes('timeout')

      // If this is a network/CORS error while using a remote base, attempt local /api proxy fallback once
      const usingRemote = String(instance.defaults.baseURL || '').startsWith('http')
      if ((isNetworkError || isTimeout) && usingRemote) {
        console.warn('Remote request failed due to network/CORS. Attempting local /api proxy fallback...', err.message)
        try {
          const fallbackResponse = await localInstance.request(config)
          console.log('Fallback to local /api succeeded')
          return fallbackResponse
        } catch (fallbackErr) {
          console.warn('Local fallback also failed:', fallbackErr.message)
          // continue to retry remote as per original flow
        }
      }

      // If proxy/Vite returned a 502 (bad gateway), try calling the backend directly (bypass proxy)
      const status = err.response?.status
      if (status === 502 || status === 503 || status === 504) {
        try {
          console.warn(`Proxy returned ${status}. Attempting direct backend call to ${directBase}...`)
          const directResponse = await directInstance.request(config)
          console.log('Direct backend call succeeded')
          return directResponse
        } catch (directErr) {
          console.warn('Direct backend call failed:', directErr.message)
          // fallthrough to retry logic
        }
      }

      if (attempt === retries || (!isNetworkError && !isTimeout)) {
        throw err
      }
      attempt++
      const delay = backoff * attempt
      console.warn(`Request failed (attempt ${attempt}). Retrying after ${delay}ms...`, err.message)
      await new Promise(res => setTimeout(res, delay))
    }
  }
}

export default instance;

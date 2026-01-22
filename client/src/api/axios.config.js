import axios from "axios";

const directBase =
  import.meta?.env?.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL.replace(/\/+$/, "")}/api`
    : typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:3000/api`
    : "http://localhost:3000/api";

// 🔹 CHANGE 2: ENV name align (VITE_API_URL)
let apiBase =
  typeof import.meta !== "undefined" &&
  import.meta.env &&
  import.meta.env.VITE_API_URL
    ? String(import.meta.env.VITE_API_URL)
    : "/api";

/* ===================== EXISTING LOCAL DEV LOGIC ===================== */

if (
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1") &&
  apiBase === "/api"
) {
  apiBase = directBase;
}

/* ===================== ADDITION: NETLIFY PROD SAFETY ===================== */

if (
  typeof window !== "undefined" &&
  window.location.hostname.includes("netlify.app") &&
  apiBase === "/api"
) {
  apiBase = `${import.meta.env.VITE_API_URL.replace(/\/+$/, "")}/api`;
}

/* ===================== EXISTING NORMALIZATION ===================== */

if (apiBase !== "/api" && !apiBase.startsWith("http")) {
  apiBase = apiBase.replace(/\/+$/, "");
  if (!apiBase.endsWith("/api")) {
    apiBase = `${apiBase}/api`;
  }
}

/* ===================== AXIOS INSTANCES (UNCHANGED) ===================== */

export const instance = axios.create({
  baseURL: apiBase,
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use((config) => {
  console.log(
    `API Request -> ${config.method?.toUpperCase() || "GET"} ${
      config.url
    } (base: ${instance.defaults.baseURL}) (timeout: ${config.timeout}ms)`
  );
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("Network or CORS error when calling API:", error.message);
    } else {
      console.warn(
        "API response error:",
        error.response.status,
        error.response?.data
      );
    }
    return Promise.reject(error);
  }
);

/* ===================== EXISTING FALLBACK INSTANCES ===================== */

const localInstance = axios.create({
  baseURL: "/api",
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
});

const directInstance = axios.create({
  baseURL: directBase,
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
});

/* ===================== EXISTING RETRY LOGIC (UNCHANGED) ===================== */

export async function requestWithRetry(config, retries = 2, backoff = 300) {
  let attempt = 0;
  while (attempt <= retries) {
    try {
      return await instance.request(config);
    } catch (err) {
      const status = err.response?.status;
      const isNetworkError = !err.response;
      const isTimeout =
        err.code === "ECONNABORTED" ||
        err.message?.toLowerCase().includes("timeout");
      const message = err.message || "";

      const proxyBadGateway =
        status === 502 &&
        (err.response?.data?.error === "Bad gateway (proxy error)" ||
          /bad gateway/i.test(message));

      const usingRemote = String(instance.defaults.baseURL || "").startsWith(
        "http"
      );

      if ((isNetworkError || isTimeout) && usingRemote) {
        try {
          const fallbackResponse = await localInstance.request(config);
          return fallbackResponse;
        } catch {}
      }

      if (
        status === 502 ||
        status === 503 ||
        status === 504 ||
        proxyBadGateway
      ) {
        try {
          const directResponse = await directInstance.request(config);
          return directResponse;
        } catch {}
      }

      if (attempt === retries) throw err;

      attempt++;
      await new Promise((res) => setTimeout(res, backoff * attempt));
    }
  }
}

export default instance;

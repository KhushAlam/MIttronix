import { instance } from './axios.config.js'
import { localStorageService } from './localStorageService.js'
import { mockProducts } from './mockData.js'

export const productService = {
  // Create a new product
  createProduct: async (productData) => {
    try {
      const formData = new FormData()
      
      // Add text fields
      formData.append('name', productData.name)
      formData.append('description', productData.description)
      formData.append('category', productData.category)
      formData.append('price', productData.price)
      formData.append('colour', productData.colour || '')
      formData.append('specification', productData.specification || '')
      formData.append('stockQuantity', productData.stockQuantity || 0)
      formData.append('stockStatus', productData.stockStatus || 'InStock')
      formData.append('brand', productData.brand || '')
      formData.append('isActive', productData.isActive !== undefined ? productData.isActive : true)
      
      // Add image files (backend expects multiple files in 'productImages' field)
      if (productData.images && productData.images.length > 0) {
        productData.images.forEach(image => {
          formData.append('productImages', image)
        })
      }
      
      const response = await instance.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return response.data
    } catch (error) {
      console.error('Product creation error:', error)

      // Handle network errors
      if (error.message === 'Network Error') {
        throw new Error('Cannot connect to server. Please check if the backend is running.')
      }

      // Handle validation errors from backend
      if (error.response?.status === 400) {
        throw new Error(error.response.data.message || 'Invalid product data')
      }

      // Handle server errors
      if (error.response?.status >= 500) {
        throw new Error('Server error. Please try again later.')
      }

      throw error.response?.data || error
    }
  },

  // Get all products
  getProducts: async (filters = {}) => {
    try {
      const response = await instance.get('/products', {
        params: filters
      })
      return response.data
    } catch (error) {
      console.warn('API not available, using mock data for products:', error.message)
      // Return mock data as fallback
      return mockProducts
    }
  },

  // Update a product
  updateProduct: async (id, productData) => {
    try {
      const response = await instance.put(`/products/${id}`, productData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Delete a product
  deleteProduct: async (id) => {
    try {
      const response = await instance.delete(`/products/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }
}

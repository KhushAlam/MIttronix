import { instance } from './axios.config.js'
import { mockCategories } from './mockData.js'

export const categoryService = {
  // Get all categories
  getCategories: async () => {
    try {
      console.log('Fetching categories from:', instance.defaults.baseURL + 'category')
      const response = await instance.get('/category')
      console.log('Categories response:', response.data)
      return response.data
    } catch (error) {
      console.warn('API not available, using mock data for categories:', error.message)
      // Return mock data as fallback
      return mockCategories
    }
  },

  // Get parent categories only
  getParentCategories: async () => {
    try {
      const response = await instance.get('/category/parent')
      return response.data
    } catch (error) {
      console.warn('API not available, using mock data for parent categories:', error.message)
      // Return only parent categories from mock data (where parent is null)
      return mockCategories.filter(category => category.parent === null)
    }
  },

  // Create a new category
  createCategory: async (categoryData) => {
    try {
      const response = await instance.post('/category', categoryData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Update a category
  updateCategory: async (id, categoryData) => {
    try {
      const response = await instance.put(`/category/${id}`, categoryData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Delete a category
  deleteCategory: async (id) => {
    try {
      const response = await instance.delete(`/category/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }
}

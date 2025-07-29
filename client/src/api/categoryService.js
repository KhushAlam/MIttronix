import { instance } from './axios.config.js'

export const categoryService = {
  // Get all categories
  getCategories: async () => {
    try {
      console.log('Fetching categories from:', instance.defaults.baseURL + 'category')
      const response = await instance.get('/category')
      console.log('Categories response:', response.data)
      return response.data
    } catch (error) {
      console.error('Categories fetch error:', error)
      console.error('Error details:', {
        message: error.message,
        response: error.response,
        request: error.request
      })
      throw error.response?.data || error
    }
  },

  // Get parent categories only
  getParentCategories: async () => {
    try {
      const response = await instance.get('/category/parent')
      return response.data
    } catch (error) {
      throw error.response?.data || error
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

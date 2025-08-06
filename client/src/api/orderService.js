import { instance } from './axios.config.js'

export const orderService = {
  getOrders: async () => {
    try {
      const response = await instance.get('/orders')
      return response.data
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw error
    }
  },

  getOrdersThisMonth: async () => {
    try {
      const response = await instance.get('/orders/this-month')
      return response.data
    } catch (error) {
      console.error('Error fetching orders this month:', error)
      throw error
    }
  },

  getOrdersLastMonth: async () => {
    try {
      const response = await instance.get('/orders/last-month')
      return response.data
    } catch (error) {
      console.error('Error fetching orders last month:', error)
      throw error
    }
  },

  getOrdersThisYear: async () => {
    try {
      const response = await instance.get('/orders/this-year')
      return response.data
    } catch (error) {
      console.error('Error fetching orders this year:', error)
      throw error
    }
  },

  getOrdersByMonth: async (year, month) => {
    try {
      const response = await instance.get('/orders/by-month', {
        params: { year, month }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching orders by month:', error)
      throw error
    }
  },

  createOrder: async (orderData) => {
    try {
      const response = await instance.post('/orders', orderData)
      return response.data
    } catch (error) {
      console.error('Error creating order:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create order'
      throw new Error(errorMessage)
    }
  },

  updateOrder: async (id, orderData) => {
    try {
      const response = await instance.put(`/orders/${id}`, orderData)
      return response.data
    } catch (error) {
      console.error('Error updating order:', error)
      throw error
    }
  },

  deleteOrder: async (id) => {
    try {
      const response = await instance.delete(`/orders/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting order:', error)
      throw error
    }
  }
}

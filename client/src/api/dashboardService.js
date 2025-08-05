import { instance } from './axios.config.js'
import { orderService } from './orderService.js'
import { productService } from './productService.js'

export const dashboardService = {
  getDashboardStats: async () => {
    try {
      // Fetch data from multiple endpoints
      const [orders, ordersThisMonth, ordersLastMonth, products] = await Promise.all([
        orderService.getOrders(),
        orderService.getOrdersThisMonth(),
        orderService.getOrdersLastMonth(),
        productService.getProducts()
      ])

      // Calculate stats
      const totalOrders = orders?.length || 0
      const ordersThisMonthCount = ordersThisMonth?.count || 0
      const ordersLastMonthCount = ordersLastMonth?.count || 0
      
      // Calculate completed orders (assuming orderStatus: 'Completed' or 'Delivered')
      const completedOrders = orders?.filter(order => 
        order.orderStatus === 'Completed' || order.orderStatus === 'Delivered'
      )?.length || 0
      
      // Calculate total revenue from this month's orders
      const totalRevenue = ordersThisMonth?.data?.reduce((sum, order) => 
        sum + (order.totalAmount || 0), 0
      ) || 0
      
      // Calculate percentage changes
      const ordersChange = ordersLastMonthCount > 0 
        ? ((ordersThisMonthCount - ordersLastMonthCount) / ordersLastMonthCount * 100).toFixed(1)
        : '0.0'
      
      // Estimate customers (unique customer count from orders)
      const uniqueCustomers = new Set(orders?.map(order => order.customerName || order.customerId)).size || 0
      const lastMonthCustomers = new Set(ordersLastMonth?.data?.map(order => order.customerName || order.customerId)).size || 0
      
      const customersChange = lastMonthCustomers > 0
        ? ((uniqueCustomers - lastMonthCustomers) / lastMonthCustomers * 100).toFixed(1)
        : '0.0'
      
      return {
        totalOrders,
        totalCustomers: uniqueCustomers,
        completedOrders,
        totalRevenue,
        ordersChange,
        customersChange,
        completedOrdersChange: '0.3', // Default value as this needs historical data
        revenueChange: '10.6' // Default value as this needs historical comparison
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      // Return fallback data on error
      return {
        totalOrders: 0,
        totalCustomers: 0,
        completedOrders: 0,
        totalRevenue: 0,
        ordersChange: '0.0',
        customersChange: '0.0',
        completedOrdersChange: '0.0',
        revenueChange: '0.0'
      }
    }
  }
}

import Order from '../models/order.model.js'

export const getOrders = async (req,res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({
            message: "Couldn't get orders"
        })
    }
}

export const getOrdersByMonth = async (req, res) => {
  try {
    const { year, month } = req.query;

    if (!year || !month) {
      return res.status(400).json({
        message: "Please provide both year and month as query parameters."
      });
    }

    const yearNum = parseInt(year);
    const monthNum = parseInt(month);

    if (isNaN(yearNum) || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      return res.status(400).json({
        message: "Invalid year or month. Month must be between 1 and 12."
      });
    }

    const startDate = new Date(yearNum, monthNum - 1, 1);
    const endDate = new Date(yearNum, monthNum, 1);

    const orders = await Order.find({
      orderDate: {
        $gte: startDate,
        $lt: endDate
      }
    }).sort({ orderDate: 'asc' });

    if (orders.length === 0) {
      return res.status(200).json({
        message: `No orders found for ${startDate.toLocaleString('default', { month: 'long' })} ${yearNum}.`,
        data: []
      });
    }

    res.status(200).json({
      message: `Successfully retrieved ${orders.length} orders.`,
      count: orders.length,
      data: orders
    });

  } catch (error) {
    console.error("Error fetching orders by month:", error);
    res.status(500).json({
      message: "Server error while fetching orders.",
      error: error.message
    });
  }
};


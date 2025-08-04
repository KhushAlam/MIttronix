import { Link } from "react-router-dom";
import {
  MdRefresh,
  MdLocalShipping,
  MdCancel,
  MdLocalShipping as MdShipped,
  MdDeliveryDining,
  MdPending,
  MdCheckCircle,
  MdHourglassEmpty,
  MdVisibility,
  MdEdit,
  MdAdd,
  MdReceipt,
} from "react-icons/md";

function OrdersList() {
  const orderStats = [
    {
      title: "Payment Refund",
      count: "490",
      icon: <MdRefresh size={24} />,
      color: "orange",
    },
    {
      title: "Order Cancel",
      count: "241",
      icon: <MdCancel size={24} />,
      color: "orange",
    },
    {
      title: "Order Shipped",
      count: "630",
      icon: <MdShipped size={24} />,
      color: "orange",
    },
    {
      title: "Order Delivering",
      count: "170",
      icon: <MdDeliveryDining size={24} />,
      color: "orange",
    },
    {
      title: "Pending Review",
      count: "210",
      icon: <MdPending size={24} />,
      color: "orange",
    },
    {
      title: "Pending Payment",
      count: "608",
      icon: <MdHourglassEmpty size={24} />,
      color: "orange",
    },
    {
      title: "Delivered",
      count: "200",
      icon: <MdCheckCircle size={24} />,
      color: "orange",
    },
    {
      title: "In Progress",
      count: "656",
      icon: <MdHourglassEmpty size={24} />,
      color: "orange",
    },
  ];

  const orders = [
    {
      id: "#58348B/80",
      createdAt: "Apr 23, 2024",
      customer: "Gail C. Anderson",
      priority: "Normal",
      total: "$1,230.00",
      paymentStatus: "Unpaid",
      items: 4,
      mode: "Online",
      deliveryNumber: "-",
      orderStatus: "Draft",
    },
    {
      id: "#456754/80",
      createdAt: "Apr 20, 2024",
      customer: "Jung S. Ayala",
      priority: "Normal",
      total: "$987.00",
      paymentStatus: "Paid",
      items: 2,
      mode: "Online",
      deliveryNumber: "-",
      orderStatus: "Packaging",
    },
    {
      id: "#372346/80",
      createdAt: "Apr 19, 2024",
      customer: "David A. Arnold",
      priority: "High",
      total: "$1,439.00",
      paymentStatus: "Paid",
      items: 5,
      mode: "Online",
      deliveryNumber: "#D-4537",
      orderStatus: "Completed",
    },
    {
      id: "#195756/80",
      createdAt: "Apr 18, 2024",
      customer: "Betty R. Sims",
      priority: "Normal",
      total: "$756.00",
      paymentStatus: "Paid",
      items: 3,
      mode: "Offline",
      deliveryNumber: "#D-1247",
      orderStatus: "Shipped",
    },
    {
      id: "#163425/80",
      createdAt: "Apr 17, 2024",
      customer: "John M. Smith",
      priority: "Low",
      total: "$432.00",
      paymentStatus: "Unpaid",
      items: 1,
      mode: "Online",
      deliveryNumber: "-",
      orderStatus: "Pending",
    },
  ];

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "status-paid";
      case "unpaid":
        return "status-unpaid";
      case "completed":
        return "status-completed";
      case "shipped":
        return "status-shipped";
      case "packaging":
        return "status-packaging";
      case "draft":
        return "status-draft";
      case "pending":
        return "status-pending";
      default:
        return "status-default";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "priority-high";
      case "normal":
        return "priority-normal";
      case "low":
        return "priority-low";
      default:
        return "priority-normal";
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">ORDERS LIST</h1>
        </div>
        <div className="page-actions">
          <select className="time-filter">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>
          <Link to="/orders/add" className="btn btn-primary">
            <MdAdd size={16} />
            Create Order
          </Link>
        </div>
      </div>

      {/* Order Statistics Grid */}
      <div className="orders-stats-grid">
        {orderStats.map((stat, index) => (
          <div key={index} className="order-stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <h3 className="stat-title">{stat.title}</h3>
                <div className="stat-number">{stat.count}</div>
              </div>
              <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      <div className="content-card">
        <div className="table-header">
          <h3>All Order List</h3>
          <select className="table-filter">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Created at</th>
                <th>Customer</th>
                <th>Mode</th>
                <th>Priority</th>
                <th>Total</th>
                <th>Payment Status</th>
                <th>Items</th>
                <th>Delivery Number</th>
                <th>Order Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>
                    <Link
                      to={`/orders/details/${order.id}`}
                      className="order-link"
                    >
                      {order.id}
                    </Link>
                  </td>
                  <td>{order.createdAt}</td>
                  <td>{order.customer}</td>
                  <td>{order.mode}</td>
                  <td>
                    <span
                      className={`priority-badge ${getPriorityClass(
                        order.priority
                      )}`}
                    >
                      {order.priority}
                    </span>
                  </td>
                  <td className="price-cell">{order.total}</td>
                  <td>
                    <span
                      className={`status-badge ${getStatusBadgeClass(
                        order.paymentStatus
                      )}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td>{order.items}</td>
                  <td>{order.deliveryNumber}</td>
                  <td>
                    <span
                      className={`status-badge ${getStatusBadgeClass(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link
                        to={`/orders/details/${order.id}`}
                        className="action-btn view"
                        title="View Order"
                      >
                        <MdVisibility size={16} />
                      </Link>
                      <Link
                        to={`/orders/edit/${order.id}`}
                        className="action-btn edit"
                        title="Edit Order"
                      >
                        <MdEdit size={16} />
                      </Link>
                      <Link
                        to={`/invoices/add/${order.id}`}
                        className="action-btn delete"
                        title="Generate Invoice"
                      >
                        <MdReceipt size={16} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrdersList;

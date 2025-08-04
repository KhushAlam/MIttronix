import { Link, useParams } from 'react-router-dom'
import { MdArrowBack, MdPrint, MdEdit, MdLocalShipping, MdCheckCircle } from 'react-icons/md'

function OrderDetails() {
  const { id } = useParams()

  const order = {
    id: id || '#ORD-001',
    date: '2024-01-15',
    status: 'Processing',
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      address: '123 Main Street, New York, NY 10001'
    },
    billing: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      address: '123 Main Street, New York, NY 10001'
    },
    shipping: {
      method: 'Standard Shipping',
      cost: 500,
      estimatedDelivery: '2024-01-22'
    },
    payment: {
      method: 'Credit Card',
      status: 'Paid',
      transactionId: 'TXN-123456789'
    },
    items: [
      {
        id: 1,
        name: 'Smartphone Case',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150',
        sku: 'PHN-001',
        price: 500,
        quantity: 2,
        total: 1000
      },
      {
        id: 2,
        name: 'Wireless Charger',
        image: 'https://images.unsplash.com/photo-1586953269623-c5c0f4c48ebc?w=150',
        sku: 'CHG-002',
        price: 2000,
        quantity: 1,
        total: 2000
      }
    ],
    shippingCost: 15.00,
    taxRate: 10.74, 
    discountAmount: 0
  }

  const calculateTotals = () => {
    const subtotal = order.items.reduce((sum, item) => sum + item.total, 0)
    const tax = (subtotal * order.taxRate) / 100
    const total = subtotal + tax + order.shippingCost - order.discountAmount
    return { subtotal, tax, total }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'status-success'
      case 'Processing': return 'status-warning'
      case 'Shipped': return 'status-info'
      case 'Cancelled': return 'status-danger'
      default: return 'status-secondary'
    }
  }

  const { subtotal, tax, total } = calculateTotals()

  return (
    <div>
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Order Details</h1>
          <p className="page-subtitle">Order {order.id}</p>
        </div>
        <div className="page-actions">
          <Link to="/orders/list" className="btn btn-secondary">
            <MdArrowBack size={16} />
            Back to Orders
          </Link>
          <Link to={`/orders/edit/${id}`} className="btn btn-primary">
            <MdEdit size={16} />
            Edit Order
          </Link>
          <button className="btn btn-outline">
            <MdPrint size={16} />
            Print
          </button>
        </div>
      </div>

      <div className="order-details-container">
        {/* Order Summary Card */}
        <div className="content-card order-summary">
          <div className="order-summary-header">
            <div className="order-info">
              <h3>Order {order.id}</h3>
              <p className="order-date">Placed on {order.date}</p>
            </div>
            <div className="order-status">
              <span className={`status-badge ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
          </div>
          
          <div className="order-progress">
            <div className="progress-step completed">
              <div className="step-icon">
                <MdCheckCircle size={20} />
              </div>
              <div className="step-content">
                <h4>Order Placed</h4>
                <p>Jan 15, 2024</p>
              </div>
            </div>
            <div className="progress-step completed">
              <div className="step-icon">
                <MdCheckCircle size={20} />
              </div>
              <div className="step-content">
                <h4>Payment Confirmed</h4>
                <p>Jan 15, 2024</p>
              </div>
            </div>
            <div className="progress-step active">
              <div className="step-icon">
                <MdEdit size={20} />
              </div>
              <div className="step-content">
                <h4>Processing</h4>
                <p>In progress</p>
              </div>
            </div>
            <div className="progress-step">
              <div className="step-icon">
                <MdLocalShipping size={20} />
              </div>
              <div className="step-content">
                <h4>Shipped</h4>
                <p>Pending</p>
              </div>
            </div>
          </div>
        </div>

        <div className="order-content-grid">
          {/* Customer Information */}
          <div className="content-card">
            <h3>Customer Information</h3>
            <div className="customer-info">
              <div className="info-group">
                <h4>Customer Details</h4>
                <p><strong>Name:</strong> {order.customer.name}</p>
                <p><strong>Email:</strong> {order.customer.email}</p>
                <p><strong>Phone:</strong> {order.customer.phone}</p>
              </div>
              <div className="info-group">
                <h4>Shipping Address</h4>
                <p>{order.customer.address}</p>
              </div>
              <div className="info-group">
                <h4>Billing Address</h4>
                <p>{order.billing.address}</p>
              </div>
            </div>
          </div>

          {/* Payment & Shipping */}
          <div className="content-card">
            <h3>Payment & Shipping</h3>
            <div className="payment-shipping-info">
              <div className="info-group">
                <h4>Payment Information</h4>
                <p><strong>Method:</strong> {order.payment.method}</p>
                <p><strong>Status:</strong> 
                  <span className="status-badge status-success">{order.payment.status}</span>
                </p>
                <p><strong>Transaction ID:</strong> {order.payment.transactionId}</p>
              </div>
              <div className="info-group">
                <h4>Shipping Information</h4>
                <p><strong>Method:</strong> {order.shipping.method}</p>
                <p><strong>Cost:</strong> ₹{order.shipping.cost.toFixed(2)}</p>
                <p><strong>Estimated Delivery:</strong> {order.shipping.estimatedDelivery}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="content-card">
          <h3>Order Items</h3>
          <div className="order-items">
            <div className="items-table">
              <div className="table-header">
                <div className="col-product">Product</div>
                <div className="col-sku">SKU</div>
                <div className="col-price">Price</div>
                <div className="col-quantity">Quantity</div>
                <div className="col-total">Total</div>
              </div>
              {order.items.map((item) => (
                <div key={item.id} className="table-row">
                  <div className="col-product">
                    <div className="product-info">
                      <img src={item.image} alt={item.name} className="product-image" />
                      <span className="product-name">{item.name}</span>
                    </div>
                  </div>
                  <div className="col-sku">{item.sku}</div>
                  <div className="col-price">₹{item.price}</div>
                  <div className="col-quantity">{item.quantity}</div>
                  <div className="col-total">₹{item.total}</div>
                </div>
              ))}
            </div>
            
            <div className="order-totals">
              <div className="totals-section">
                <div className="totals-row">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="totals-row">
                  <span>Shipping:</span>
                  <span>₹{order.shippingCost.toFixed(2)}</span>
                </div>
                <div className="totals-row">
                  <span>Tax ({order.taxRate}%):</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="totals-row">
                    <span>Discount:</span>
                    <span>-₹{order.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="totals-row total">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails

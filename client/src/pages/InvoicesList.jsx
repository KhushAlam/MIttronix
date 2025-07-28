import { Link } from 'react-router-dom'
import { MdReceipt, MdPending, MdCheckCircle, MdCancel, MdVisibility, MdEdit, MdDelete, MdAdd } from 'react-icons/md'

function InvoicesList() {
  const invoiceStats = [
    { 
      title: 'Total Invoice', 
      count: '2310', 
      icon: <MdReceipt size={24} />,
      color: 'orange'
    },
    { 
      title: 'Pending Invoice', 
      count: '1000', 
      icon: <MdPending size={24} />,
      color: 'orange'
    },
    { 
      title: 'Paid Invoice', 
      count: '1310', 
      icon: <MdCheckCircle size={24} />,
      color: 'orange'
    },
    { 
      title: 'Inactive Invoice', 
      count: '1243', 
      icon: <MdCancel size={24} />,
      color: 'orange'
    }
  ]

  const invoices = [
    {
      id: '#INV2540',
      billingName: 'Michael A. Miner',
      avatar: 'https://via.placeholder.com/40x40',
      orderDate: '07 Jan, 2023',
      total: '$452',
      paymentMethod: 'Mastercard',
      status: 'Completed'
    },
    {
      id: '#INV3924',
      billingName: 'Theresa T. Brose',
      avatar: 'https://via.placeholder.com/40x40',
      orderDate: '03 Dec, 2023',
      total: '$783',
      paymentMethod: 'Visa',
      status: 'Cancel'
    },
    {
      id: '#INV5032',
      billingName: 'James L. Erickson',
      avatar: 'https://via.placeholder.com/40x40',
      orderDate: '28 Sep, 2023',
      total: '$134',
      paymentMethod: 'Paypal',
      status: 'Completed'
    },
    {
      id: '#INV1695',
      billingName: 'Lily W. Wilson',
      avatar: 'https://via.placeholder.com/40x40',
      orderDate: '10 Aug, 2023',
      total: '$945',
      paymentMethod: 'Mastercard',
      status: 'Pending'
    },
    {
      id: '#INV8473',
      billingName: 'Sarah M. Brooks',
      avatar: 'https://via.placeholder.com/40x40',
      orderDate: '22 May, 2023',
      total: '$421',
      paymentMethod: 'Visa',
      status: 'Cancel'
    }
  ]

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'status-completed'
      case 'pending': return 'status-pending'
      case 'cancel': return 'status-cancel'
      default: return 'status-default'
    }
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">INVOICES LIST</h1>
        </div>
        <div className="page-actions">
          <select className="time-filter">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>
          <Link to="/invoices/add" className="btn btn-primary">
            <MdAdd size={16} />
            Create Invoice
          </Link>
        </div>
      </div>

      {/* Invoice Statistics Grid */}
      <div className="orders-stats-grid">
        {invoiceStats.map((stat, index) => (
          <div key={index} className="order-stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <h3 className="stat-title">{stat.title}</h3>
                <div className="stat-number">{stat.count}</div>
              </div>
              <div className={`stat-icon ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Invoices Table */}
      <div className="content-card">
        <div className="table-header">
          <h3>All Invoices List</h3>
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
                <th>
                  <input type="checkbox" />
                </th>
                <th>Invoice ID</th>
                <th>Billing Name</th>
                <th>Order Date</th>
                <th>Total</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <Link to={`/invoices/details/${invoice.id}`} className="order-link">
                      {invoice.id}
                    </Link>
                  </td>
                  <td>
                    <div className="billing-info">
                      <img src={invoice.avatar} alt={invoice.billingName} className="user-avatar-small" />
                      <span>{invoice.billingName}</span>
                    </div>
                  </td>
                  <td>{invoice.orderDate}</td>
                  <td className="price-cell">{invoice.total}</td>
                  <td>{invoice.paymentMethod}</td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link 
                        to={`/invoices/details/${invoice.id}`} 
                        className="action-btn view"
                        title="View Invoice"
                      >
                        <MdVisibility size={16} />
                      </Link>
                      <Link 
                        to={`/invoices/edit/${invoice.id}`} 
                        className="action-btn edit"
                        title="Edit Invoice"
                      >
                        <MdEdit size={16} />
                      </Link>
                      <button 
                        className="action-btn delete"
                        title="Delete Invoice"
                      >
                        <MdDelete size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default InvoicesList

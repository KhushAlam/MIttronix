import { Link, useParams } from 'react-router-dom'
import { MdArrowBack, MdPrint, MdDownload, MdEdit } from 'react-icons/md'

function InvoiceDetails() {
  const { id } = useParams()

  // Mock invoice data
  const invoice = {
    id: id || 'INV-001',
    number: 'INV-2024-001',
    date: '2024-01-15',
    dueDate: '2024-02-15',
    status: 'Paid',
    company: {
      name: 'Mitronix Electronics',
      address: '123 Business Street, Suite 100',
      city: 'New York, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'info@mitronix.com',
      website: 'www.mitronix.com'
    },
    customer: {
      name: 'John Doe',
      company: 'Acme Corporation',
      address: '456 Customer Ave',
      city: 'Los Angeles, CA 90001',
      email: 'john.doe@acme.com',
      phone: '+1 (555) 987-6543'
    },
    items: [
      {
        id: 1,
        description: 'Smartphone Case - Premium Quality',
        quantity: 2,
        rate: 25.99,
        amount: 51.98
      },
      {
        id: 2,
        description: 'Wireless Charging Pad',
        quantity: 1,
        rate: 39.99,
        amount: 39.99
      },
      {
        id: 3,
        description: 'USB-C Cable (2m)',
        quantity: 3,
        rate: 12.99,
        amount: 38.97
      }
    ],
    subtotal: 130.94,
    tax: 15.71,
    discount: 5.00,
    total: 141.65,
    amountPaid: 141.65,
    balance: 0.00
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'status-success'
      case 'Pending': return 'status-warning'
      case 'Overdue': return 'status-danger'
      case 'Draft': return 'status-secondary'
      default: return 'status-secondary'
    }
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Invoice Details</h1>
          <p className="page-subtitle">Invoice {invoice.number}</p>
        </div>
        <div className="page-actions">
          <Link to="/invoices/list" className="btn btn-secondary">
            <MdArrowBack size={16} />
            Back to Invoices
          </Link>
          <Link to={`/invoices/edit/${invoice.id}`} className="btn btn-outline">
            <MdEdit size={16} />
            Edit
          </Link>
          <button className="btn btn-outline">
            <MdDownload size={16} />
            Download
          </button>
          <button className="btn btn-primary">
            <MdPrint size={16} />
            Print
          </button>
        </div>
      </div>

      <div className="invoice-details-container">
        <div className="content-card invoice-card">
          {/* Invoice Header */}
          <div className="invoice-header">
            <div className="company-info">
              <h2 className="company-name">{invoice.company.name}</h2>
              <div className="company-details">
                <p>{invoice.company.address}</p>
                <p>{invoice.company.city}</p>
                <p>Phone: {invoice.company.phone}</p>
                <p>Email: {invoice.company.email}</p>
                <p>Website: {invoice.company.website}</p>
              </div>
            </div>
            <div className="invoice-meta">
              <h1 className="invoice-title">INVOICE</h1>
              <div className="invoice-number">#{invoice.number}</div>
              <div className="invoice-status">
                <span className={`status-badge ${getStatusColor(invoice.status)}`}>
                  {invoice.status}
                </span>
              </div>
            </div>
          </div>

          {/* Invoice Info Grid */}
          <div className="invoice-info-grid">
            <div className="bill-to">
              <h3>Bill To:</h3>
              <div className="customer-details">
                <p className="customer-name">{invoice.customer.name}</p>
                <p className="customer-company">{invoice.customer.company}</p>
                <p>{invoice.customer.address}</p>
                <p>{invoice.customer.city}</p>
                <p>Email: {invoice.customer.email}</p>
                <p>Phone: {invoice.customer.phone}</p>
              </div>
            </div>
            <div className="invoice-dates">
              <div className="date-group">
                <label>Invoice Date:</label>
                <span>{invoice.date}</span>
              </div>
              <div className="date-group">
                <label>Due Date:</label>
                <span>{invoice.dueDate}</span>
              </div>
            </div>
          </div>

          {/* Invoice Items Table */}
          <div className="invoice-items">
            <table className="items-table">
              <thead>
                <tr>
                  <th className="description-col">Description</th>
                  <th className="quantity-col">Qty</th>
                  <th className="rate-col">Rate</th>
                  <th className="amount-col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id}>
                    <td className="description-col">{item.description}</td>
                    <td className="quantity-col">{item.quantity}</td>
                    <td className="rate-col">${item.rate.toFixed(2)}</td>
                    <td className="amount-col">${item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Invoice Totals */}
          <div className="invoice-totals">
            <div className="totals-section">
              <div className="total-row">
                <span className="total-label">Subtotal:</span>
                <span className="total-value">${invoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span className="total-label">Discount:</span>
                <span className="total-value">-${invoice.discount.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span className="total-label">Tax (12%):</span>
                <span className="total-value">${invoice.tax.toFixed(2)}</span>
              </div>
              <div className="total-row grand-total">
                <span className="total-label">Total:</span>
                <span className="total-value">${invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="payment-summary">
            <div className="payment-row">
              <span className="payment-label">Amount Paid:</span>
              <span className="payment-value">${invoice.amountPaid.toFixed(2)}</span>
            </div>
            <div className="payment-row balance">
              <span className="payment-label">Balance Due:</span>
              <span className="payment-value">${invoice.balance.toFixed(2)}</span>
            </div>
          </div>

          {/* Invoice Footer */}
          <div className="invoice-footer">
            <div className="notes-section">
              <h4>Notes:</h4>
              <p>Thank you for your business! Payment is due within 30 days of invoice date.</p>
            </div>
            <div className="terms-section">
              <h4>Terms & Conditions:</h4>
              <p>Please pay within the payment due date to avoid any inconvenience.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoiceDetails

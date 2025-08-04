import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MdArrowBack, MdSave, MdAdd, MdDelete } from 'react-icons/md'

function InvoiceEdit() {
  const navigate = useNavigate()
  const { id } = useParams()
  
  const mockInvoice = {
    id: id || 'INV-001',
    number: 'INV-2024-001',
    date: '2024-01-15',
    dueDate: '2024-02-15',
    status: 'Paid',
    customer: {
      name: 'John Doe',
      company: 'Acme Corporation',
      address: '456 Customer Ave',
      city: 'Mumbai, MH 400001',
      email: 'john.doe@acme.com',
      phone: '+91 98765 43210'
    },
    items: [
      {
        id: 1,
        description: 'Samsung 65" QLED 4K Smart TV - Premium Quality',
        quantity: 1,
        rate: 89999,
        amount: 89999
      },
      {
        id: 2,
        description: 'LG 7kg Front Load Washing Machine',
        quantity: 1,
        rate: 42999,
        amount: 42999
      },
      {
        id: 3,
        description: 'IFB 30L Convection Microwave Oven',
        quantity: 2,
        rate: 15999,
        amount: 31998
      }
    ],
    notes: 'Thank you for your business! Payment terms: Net 30 days.',
    terms: 'All sales are final. Returns accepted within 7 days with original packaging.',
    taxRate: 18,
    discountAmount: 5000
  }
  
  const [formData, setFormData] = useState(mockInvoice)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('customer.')) {
      const customerField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        customer: {
          ...prev.customer,
          [customerField]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items]
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    }
    
    if (field === 'quantity' || field === 'rate') {
      const quantity = field === 'quantity' ? parseFloat(value) || 0 : updatedItems[index].quantity
      const rate = field === 'rate' ? parseFloat(value) || 0 : updatedItems[index].rate
      updatedItems[index].amount = quantity * rate
    }
    
    setFormData(prev => ({
      ...prev,
      items: updatedItems
    }))
  }

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    }
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }))
  }

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }))
    }
  }

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.amount, 0)
    const tax = (subtotal * formData.taxRate) / 100
    const total = subtotal + tax - formData.discountAmount
    return { subtotal, tax, total }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Updating invoice:', formData)
    // Add update logic here
    alert('Invoice updated successfully!')
    navigate(`/invoices/details/${id}`)
  }

  const { subtotal, tax, total } = calculateTotals()

  return (
    <div>
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Edit Invoice</h1>
          <p className="page-subtitle">Edit invoice #{formData.number}</p>
        </div>
        <div className="page-actions">
          <Link to={`/invoices/details/${id}`} className="btn btn-secondary">
            <MdArrowBack size={16} />
            Back to Details
          </Link>
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="invoice-form">
          <div className="form-grid">
            {/* Invoice Details */}
            <div className="content-card">
              <h3>Invoice Details</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="number">Invoice Number *</label>
                  <input
                    type="text"
                    id="number"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    required
                    placeholder="INV-2024-001"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Invoice Date *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dueDate">Due Date *</label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="content-card">
              <h3>Customer Information</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="customer.name">Customer Name *</label>
                  <input
                    type="text"
                    id="customer.name"
                    name="customer.name"
                    value={formData.customer.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="customer.company">Company</label>
                  <input
                    type="text"
                    id="customer.company"
                    name="customer.company"
                    value={formData.customer.company}
                    onChange={handleInputChange}
                    placeholder="Acme Corporation"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="customer.email">Email *</label>
                  <input
                    type="email"
                    id="customer.email"
                    name="customer.email"
                    value={formData.customer.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="customer.phone">Phone</label>
                  <input
                    type="tel"
                    id="customer.phone"
                    name="customer.phone"
                    value={formData.customer.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="customer.address">Address</label>
                <input
                  type="text"
                  id="customer.address"
                  name="customer.address"
                  value={formData.customer.address}
                  onChange={handleInputChange}
                  placeholder="456 Customer Avenue"
                />
              </div>

              <div className="form-group">
                <label htmlFor="customer.city">City</label>
                <input
                  type="text"
                  id="customer.city"
                  name="customer.city"
                  value={formData.customer.city}
                  onChange={handleInputChange}
                  placeholder="Mumbai, MH 400001"
                />
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="content-card">
            <div className="section-header">
              <h3>Invoice Items</h3>
              <button
                type="button"
                onClick={addItem}
                className="btn btn-primary btn-small"
              >
                <MdAdd size={16} />
                Add Item
              </button>
            </div>

            <div className="items-table">
              <div className="table-header">
                <div className="col-description">Description</div>
                <div className="col-quantity">Qty</div>
                <div className="col-rate">Rate (₹)</div>
                <div className="col-amount">Amount</div>
                <div className="col-actions">Actions</div>
              </div>

              {formData.items.map((item, index) => (
                <div key={item.id} className="table-row">
                  <div className="col-description">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      placeholder="Item description"
                      required
                    />
                  </div>
                  <div className="col-quantity">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      min="1"
                      required
                    />
                  </div>
                  <div className="col-rate">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                      min="0"
                      step="1"
                      required
                    />
                  </div>
                  <div className="col-amount">
                    <span className="amount-display">₹{item.amount.toLocaleString()}</span>
                  </div>
                  <div className="col-actions">
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="action-btn delete"
                      disabled={formData.items.length === 1}
                    >
                      <MdDelete size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="invoice-totals">
              <div className="totals-section">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="taxRate">Tax Rate (%)</label>
                    <input
                      type="number"
                      id="taxRate"
                      name="taxRate"
                      value={formData.taxRate}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="discountAmount">Discount Amount (₹)</label>
                    <input
                      type="number"
                      id="discountAmount"
                      name="discountAmount"
                      value={formData.discountAmount}
                      onChange={handleInputChange}
                      min="0"
                      step="1"
                    />
                  </div>
                </div>
                
                <div className="totals-display">
                  <div className="total-row">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="total-row">
                    <span>Discount:</span>
                    <span>-₹{formData.discountAmount.toLocaleString()}</span>
                  </div>
                  <div className="total-row">
                    <span>Tax ({formData.taxRate}%):</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="total-row grand-total">
                    <span>Total:</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="content-card">
            <h3>Additional Information</h3>
            
            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
                placeholder="Thank you for your business! Payment terms: Net 30 days."
              />
            </div>

            <div className="form-group">
              <label htmlFor="terms">Terms & Conditions</label>
              <textarea
                id="terms"
                name="terms"
                value={formData.terms}
                onChange={handleInputChange}
                rows="3"
                placeholder="All sales are final. Returns accepted within 7 days."
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              <MdSave size={16} />
              Update Invoice
            </button>
            <Link to={`/invoices/details/${id}`} className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InvoiceEdit

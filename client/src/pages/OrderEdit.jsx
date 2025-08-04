import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MdArrowBack, MdSave, MdAdd, MdDelete, MdSearch } from 'react-icons/md'

function OrderEdit() {
  const navigate = useNavigate()
  const { id } = useParams()
  
  const mockOrder = {
    id: id || '#ORD-001',
    orderNumber: '#ORD-001',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-22',
    priority: 'Normal',
    status: 'Processing',
    customer: {
      name: 'John Doe',
      company: 'Acme Corp',
      address: '123 Main Street',
      city: 'New York, NY 10001',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900'
    },
    products: [
      { 
        id: 1, 
        productId: '1', 
        name: 'Smartphone Case', 
        sku: 'PHN-001', 
        quantity: 2, 
        price: 2599,
        total: 5198 
      },
      { 
        id: 2, 
        productId: '2', 
        name: 'Wireless Charger', 
        sku: 'CHG-002', 
        quantity: 1, 
        price: 3999,
        total: 3999 
      }
    ],
    notes: 'Handle with care - fragile items',
    shippingAddress: '123 Main Street, New York, NY 10001',
    paymentMethod: 'Credit Card',
    taxRate: 10,
    shippingCost: 150,
    discountAmount: 0
  }

  const [formData, setFormData] = useState(mockOrder)
  const [showProductSelector, setShowProductSelector] = useState(null)
  
  const availableProducts = [
    { id: 1, name: 'Wireless Headphones', sku: 'WH-001', price: 99.99, stock: 50 },
    { id: 2, name: 'Bluetooth Speaker', sku: 'BS-002', price: 79.99, stock: 30 },
    { id: 3, name: 'USB-C Cable', sku: 'UC-003', price: 19.99, stock: 100 },
    { id: 4, name: 'Wireless Mouse', sku: 'WM-004', price: 49.99, stock: 75 },
    { id: 5, name: 'Laptop Stand', sku: 'LS-005', price: 89.99, stock: 25 },
    { id: 6, name: 'Phone Case', sku: 'PC-006', price: 29.99, stock: 80 }
  ]

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

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...formData.products]
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value
    }
    
    if (field === 'quantity' || field === 'price') {
      const quantity = field === 'quantity' ? parseFloat(value) || 0 : updatedProducts[index].quantity
      const price = field === 'price' ? parseFloat(value) || 0 : updatedProducts[index].price
      updatedProducts[index].total = quantity * price
    }
    
    setFormData(prev => ({
      ...prev,
      products: updatedProducts
    }))
  }

  const selectProduct = (productIndex, product) => {
    const updatedProducts = [...formData.products]
    updatedProducts[productIndex] = {
      ...updatedProducts[productIndex],
      productId: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price,
      total: updatedProducts[productIndex].quantity * product.price
    }
    
    setFormData(prev => ({
      ...prev,
      products: updatedProducts
    }))
    
    setShowProductSelector(null)
  }

  const addProduct = () => {
    const newProduct = {
      id: Date.now(),
      productId: '',
      name: '',
      sku: '',
      quantity: 1,
      price: 0,
      total: 0
    }
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, newProduct]
    }))
  }

  const removeProduct = (index) => {
    if (formData.products.length > 1) {
      setFormData(prev => ({
        ...prev,
        products: prev.products.filter((_, i) => i !== index)
      }))
    }
  }

  const calculateTotals = () => {
    const subtotal = formData.products.reduce((sum, product) => sum + product.total, 0)
    const tax = (subtotal * formData.taxRate) / 100
    const total = subtotal + tax + formData.shippingCost - formData.discountAmount
    return { subtotal, tax, total }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Updating order:', formData)
    // Add update logic here
    navigate('/orders/list')
  }

  const { subtotal, tax, total } = calculateTotals()

  return (
    <div>
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Edit Order</h1>
          <p className="page-subtitle">Update order {formData.orderNumber}</p>
        </div>
        <div className="page-actions">
          <Link to="/orders/list" className="btn btn-secondary">
            <MdArrowBack size={16} />
            Back to Orders
          </Link>
          <Link to={`/orders/details/${id}`} className="btn btn-outline">
            View Details
          </Link>
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="order-form">
          <div className="form-grid">
            {/* Order Details */}
            <div className="content-card">
              <h3>Order Details</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="orderNumber">Order Number *</label>
                  <input
                    type="text"
                    id="orderNumber"
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="ORD-2024-001"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="orderDate">Order Date *</label>
                  <input
                    type="date"
                    id="orderDate"
                    name="orderDate"
                    value={formData.orderDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="deliveryDate">Expected Delivery Date</label>
                  <input
                    type="date"
                    id="deliveryDate"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="status">Order Status *</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Draft">Draft</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Packaging">Packaging</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Refunded">Refunded</option>
                </select>
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
                    placeholder="Company Name"
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
                    placeholder="john@example.com"
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
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="customer.address">Billing Address</label>
                <textarea
                  id="customer.address"
                  name="customer.address"
                  value={formData.customer.address}
                  onChange={handleInputChange}
                  rows="2"
                  placeholder="123 Customer Street"
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
                  placeholder="New York, NY 10001"
                />
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="content-card">
            <div className="section-header">
              <h3>Order Products</h3>
              <button type="button" onClick={addProduct} className="btn btn-outline">
                <MdAdd size={16} />
                Add Product
              </button>
            </div>

            <div className="products-table">
              <div className="table-header">
                <div className="col-product">Product</div>
                <div className="col-sku">SKU</div>
                <div className="col-quantity">Quantity</div>
                <div className="col-price">Price</div>
                <div className="col-total">Total</div>
                <div className="col-actions">Actions</div>
              </div>
              
              {formData.products.map((product, index) => (
                <div key={product.id} className="table-row">
                  <div className="col-product">
                    <div className="product-selector">
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                        placeholder="Select or enter product name"
                        required
                      />
                      <button
                        type="button"
                        className="product-search-btn"
                        onClick={() => setShowProductSelector(index)}
                      >
                        <MdSearch size={16} />
                      </button>
                      
                      {showProductSelector === index && (
                        <div className="product-dropdown">
                          <div className="dropdown-header">
                            <strong>Select Product</strong>
                            <button
                              type="button"
                              onClick={() => setShowProductSelector(null)}
                              className="close-dropdown"
                            >
                              ×
                            </button>
                          </div>
                          <div className="product-list">
                            {availableProducts.map((availableProduct) => (
                              <div
                                key={availableProduct.id}
                                className="product-option"
                                onClick={() => selectProduct(index, availableProduct)}
                              >
                                <div className="product-info">
                                  <div className="product-name">{availableProduct.name}</div>
                                  <div className="product-details">
                                    SKU: {availableProduct.sku} | Stock: {availableProduct.stock} | ₹{availableProduct.price.toLocaleString()}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-sku">
                    <input
                      type="text"
                      value={product.sku}
                      onChange={(e) => handleProductChange(index, 'sku', e.target.value)}
                      placeholder="SKU"
                      required
                    />
                  </div>
                  <div className="col-quantity">
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                      min="1"
                      required
                    />
                  </div>
                  <div className="col-price">
                    <input
                      type="number"
                      value={product.price}
                      onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="col-total">
                    <span className="total-display">₹{product.total.toLocaleString()}</span>
                  </div>
                  <div className="col-actions">
                    <button
                      type="button"
                      onClick={() => removeProduct(index)}
                      className="action-btn delete"
                      disabled={formData.products.length === 1}
                    >
                      <MdDelete size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-totals">
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
                    <label htmlFor="shippingCost">Shipping Cost</label>
                    <input
                      type="number"
                      id="shippingCost"
                      name="shippingCost"
                      value={formData.shippingCost}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="discountAmount">Discount Amount</label>
                  <input
                    type="number"
                    id="discountAmount"
                    name="discountAmount"
                    value={formData.discountAmount}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div className="totals-display">
                  <div className="total-row">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="total-row">
                    <span>Tax ({formData.taxRate}%):</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="total-row">
                    <span>Shipping:</span>
                    <span>₹{formData.shippingCost.toLocaleString()}</span>
                  </div>
                  <div className="total-row">
                    <span>Discount:</span>
                    <span>-₹{formData.discountAmount.toLocaleString()}</span>
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
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="paymentMethod">Payment Method</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="shippingAddress">Shipping Address</label>
              <textarea
                id="shippingAddress"
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleInputChange}
                rows="3"
                placeholder="Enter shipping address (if different from billing address)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Order Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
                placeholder="Special instructions or notes for this order..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              <MdSave size={16} />
              Update Order
            </button>
            <Link to="/orders/list" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OrderEdit

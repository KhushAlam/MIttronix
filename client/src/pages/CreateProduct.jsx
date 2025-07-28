import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdCloudUpload, MdClose, MdSave, MdArrowBack } from 'react-icons/md'

function CreateProduct() {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    cost: '',
    stock: '',
    sku: '',
    status: 'Active',
    description: '',
    specifications: ''
  })

  const [images, setImages] = useState([])
  const [dragOver, setDragOver] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (files) => {
    const newImages = Array.from(files).map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Date.now() + Math.random()
    }))
    setImages(prev => [...prev, ...newImages])
  }

  const handleFileSelect = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleImageUpload(files)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleImageUpload(files)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const removeImage = (id) => {
    setImages(prev => {
      const updated = prev.filter(img => img.id !== id)
      // Clean up object URLs to prevent memory leaks
      const removed = prev.find(img => img.id === id)
      if (removed) {
        URL.revokeObjectURL(removed.preview)
      }
      return updated
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Creating product:', formData)
    console.log('Product images:', images)
    // Add create logic here
    // Clean up object URLs
    images.forEach(img => URL.revokeObjectURL(img.preview))
    navigate('/products/list')
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Create Product</h1>
          <p className="page-subtitle">Add a new product to your inventory</p>
        </div>
        <div className="page-actions">
          <Link to="/products/list" className="btn btn-secondary">
            <MdArrowBack size={16} />
            Back to List
          </Link>
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-grid">
            <div className="form-section">
              <div className="content-card">
                <h3>Product Images</h3>
                <div className="image-upload-section">
                  <div 
                    className={`image-upload-area ${dragOver ? 'dragover' : ''}`}
                    onClick={() => document.getElementById('file-input').click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    <div className="upload-icon">
                      <MdCloudUpload />
                    </div>
                    <div className="upload-text">
                      Drop your images here, or click to browse
                    </div>
                    <div className="upload-hint">
                      PNG, JPG and GIF files are allowed
                    </div>
                  </div>
                  
                  <input
                    id="file-input"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden-file-input"
                  />
                  
                  {images.length > 0 && (
                    <div className="image-preview-grid">
                      {images.map((image) => (
                        <div key={image.id} className="image-preview-item">
                          <img 
                            src={image.preview} 
                            alt="Product preview" 
                            className="image-preview"
                          />
                          <button 
                            type="button"
                            className="image-remove-btn"
                            onClick={() => removeImage(image.id)}
                          >
                            <MdClose />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="content-card">
                <h3>Basic Information</h3>
                
                <div className="form-group">
                  <label htmlFor="name">Product Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter product name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="sku">SKU *</label>
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter product SKU"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Computers">Computers</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Clothing">Clothing</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="content-card">
                <h3>Pricing & Inventory</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="price">Sale Price *</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      required
                      placeholder="0.00"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cost">Cost Price</label>
                    <input
                      type="number"
                      id="cost"
                      name="cost"
                      value={formData.cost}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="stock">Stock Quantity</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="content-card">
                <h3>Description</h3>
                <div className="form-group">
                  <label htmlFor="description">Product Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="6"
                    placeholder="Enter product description..."
                  />
                </div>
              </div>

              <div className="content-card">
                <h3>Specifications</h3>
                <div className="form-group">
                  <label htmlFor="specifications">Product Specifications</label>
                  <textarea
                    id="specifications"
                    name="specifications"
                    value={formData.specifications}
                    onChange={handleInputChange}
                    rows="8"
                    placeholder="Enter specifications (one per line)..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              <MdSave size={16} />
              Create Product
            </button>
            <Link to="/products/list" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProduct

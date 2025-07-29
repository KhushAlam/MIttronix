import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdCloudUpload, MdClose, MdSave, MdArrowBack } from 'react-icons/md'
import { productService } from '../api/productService.js'
import { categoryService } from '../api/categoryService.js'


function CreateProduct() {
  const navigate = useNavigate()

  // Initial form state for reset functionality
  const initialFormState = {
    name: '',
    category: '',
    price: '',
    stockQuantity: '',
    stockStatus: '',
    description: '',
    specification: '',
    colour: '',
    brand: '',
    isActive: true
  }

  const [formData, setFormData] = useState(initialFormState)
  const [images, setImages] = useState([])
  const [dragOver, setDragOver] = useState(false)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await categoryService.getCategories()
        setCategories(categoriesData)
        if (categoriesData.length > 0) {
          setFormData(prev => ({ ...prev, category: categoriesData[0]._id }))
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
        setError('Failed to load categories. Please try creating some categories first.')
      }
    }
    fetchCategories()
  }, [])

  const resetForm = () => {
    setFormData(initialFormState)
    setImages([])
    setError('')
    setSuccess('')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }



  const handleImageUpload = (files) => {
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    const currentImageCount = images.length
    const maxImages = 6

    if (currentImageCount >= maxImages) {
      setError(`Maximum ${maxImages} images allowed. Please remove some images first.`)
      return
    }

    const remainingSlots = maxImages - currentImageCount
    const filesToProcess = Array.from(files).slice(0, remainingSlots)

    if (files.length > remainingSlots) {
      setError(`Only ${remainingSlots} more images can be added (${maxImages} total allowed).`)
    }

    const validFiles = filesToProcess.filter(file => {
      if (!validImageTypes.includes(file.type)) {
        setError(`Invalid file type: ${file.name}. Please upload only JPG, PNG, GIF, or WebP images.`)
        return false
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError(`File too large: ${file.name}. Please upload images smaller than 5MB.`)
        return false
      }
      return true
    })

    const newImages = validFiles.map(file => ({
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validation
    if (!formData.name || !formData.price || !formData.description || !formData.category) {
      setError('Please fill in all required fields (Name, Price, Description, Category)')
      return
    }

    // Prevent submission with temporary fallback categories
    if (formData.category.startsWith('temp_')) {
      setError('Please select a valid category or create categories first')
      return
    }

    if (images.length === 0) {
      setError('Please upload at least one product image')
      return
    }

    // Validate price is a positive number
    if (formData.price <= 0) {
      setError('Price must be greater than 0')
      return
    }

    // Validate stock quantity is non-negative
    if (formData.stockQuantity && formData.stockQuantity < 0) {
      setError('Stock quantity cannot be negative')
      return
    }

    setLoading(true)

    try {
      // Prepare product data for submission
      const productData = {
        ...formData,
        images: images.map(img => img.file) // Backend expects multiple images
      }

      console.log('Submitting product data:', {
        ...productData,
        images: `${productData.images.length} images`
      })

      const result = await productService.createProduct(productData)

      console.log('Product creation result:', result)

      setSuccess('Product created successfully!')

      // Clean up object URLs
      images.forEach(img => URL.revokeObjectURL(img.preview))

      // Reset form for creating another product
      resetForm()

      // Navigate after a longer delay to show success and allow creating another
      setTimeout(() => navigate("/products/grid"), 1500);

    } catch (error) {
      console.error('Error creating product:', error)
      setError(error.message || 'Failed to create product')
    } finally {
      setLoading(false)
    }
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
        {error && (
          <div className="error-message" style={{
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div className="success-message" style={{
            backgroundColor: '#dcfce7',
            border: '1px solid #bbf7d0',
            color: '#166534',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{success}</span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => navigate('/products/list')}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#166534',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                View Products
              </button>
              <button
                type="button"
                onClick={() => setSuccess('')}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#16a34a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Create Another
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="product-form" style={{ position: 'relative' }}>
          {loading && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              borderRadius: '8px'
            }}>
              <div style={{
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  border: '3px solid #f3f3f3',
                  borderTop: '3px solid #3b82f6',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 10px'
                }}></div>
                <div>Creating product...</div>
              </div>
            </div>
          )}
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
                      PNG, JPG, GIF and WebP files are allowed (Max 5 images, 5MB each)
                      {images.length > 0 && (
                        <div style={{ marginTop: '4px', fontWeight: 'bold' }}>
                          {images.length}/5 images selected
                        </div>
                      )}
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
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="brand">Brand</label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder="Enter product brand"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category._id} value={category._id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                  {categories.length === 0 && (
                    <p style={{
                      marginTop: '8px',
                      fontSize: '14px',
                      color: '#666',
                      fontStyle: 'italic'
                    }}>
                      No categories available. Please create categories first.
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="stockStatus">Stock Status</label>
                  <select
                    id="stockStatus"
                    name="stockStatus"
                    value={formData.stockStatus}
                    onChange={handleInputChange}
                  >
                    <option value="InStock">In Stock</option>
                    <option value="OutOfStock">Out of Stock</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="colour">Color</label>
                  <input
                    type="text"
                    id="colour"
                    name="colour"
                    value={formData.colour}
                    onChange={handleInputChange}
                    placeholder="Enter product color"
                  />
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
                    <label htmlFor="stockQuantity">Stock Quantity</label>
                    <input
                      type="number"
                      id="stockQuantity"
                      name="stockQuantity"
                      value={formData.stockQuantity}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="0"
                    />
                  </div>
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
                  <label htmlFor="specification">Product Specifications</label>
                  <textarea
                    id="specification"
                    name="specification"
                    value={formData.specification}
                    onChange={handleInputChange}
                    rows="8"
                    placeholder="Enter specifications..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <MdSave size={16} />
              {loading ? 'Creating...' : 'Create Product'}
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

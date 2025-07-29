import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { MdArrowBack, MdSave, MdDelete } from 'react-icons/md'
import { productService } from '../api/productService.js'
import { categoryService } from '../api/categoryService.js'

function ProductEdit() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
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
  })

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [originalProduct, setOriginalProduct] = useState(null)

  // Fetch product data and categories on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [products, categoriesData] = await Promise.all([
          productService.getProducts(),
          categoryService.getCategories()
        ])

        const product = products.find(p => p._id === id)
        if (product) {
          setOriginalProduct(product)
          setFormData({
            name: product.name || '',
            category: product.category || '',
            price: product.price || '',
            stockQuantity: product.stockQuantity || '',
            stockStatus: product.stockStatus || 'InStock',
            description: product.description || '',
            specification: product.specification || '',
            colour: product.colour || '',
            brand: product.brand || '',
            isActive: product.isActive !== undefined ? product.isActive : true
          })
        } else {
          setError('Product not found')
        }

        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Failed to load product data')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.name || !formData.price || !formData.description || !formData.category) {
      setError('Please fill in all required fields')
      return
    }

    if (formData.price <= 0) {
      setError('Price must be greater than 0')
      return
    }

    setSaving(true)

    try {
      await productService.updateProduct(id, formData)
      alert('Product updated successfully!')
      navigate(`/products/details/${id}`)
    } catch (error) {
      console.error('Error updating product:', error)
      setError(error.message || 'Failed to update product')
    } finally {
      setSaving(false)
    }
    // Add update logic here
    navigate(`/products/details/${id}`)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      console.log('Deleting product:', id)
      // Add delete logic here
      navigate('/products/list')
    }
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Edit Product</h1>
          <p className="page-subtitle">Update product information</p>
        </div>
        <div className="page-actions">
          <Link to={`/products/details/${id}`} className="btn btn-secondary">
            <MdArrowBack size={16} />
            Back to Details
          </Link>
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-grid">
            <div className="form-section">
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

              <div className="content-card danger-zone">
                <h3>Danger Zone</h3>
                <p>Once you delete a product, there is no going back. Please be certain.</p>
                <button 
                  type="button" 
                  onClick={handleDelete}
                  className="btn btn-danger"
                >
                  <MdDelete size={16} />
                  Delete Product
                </button>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              <MdSave size={16} />
              Save Changes
            </button>
            <Link to={`/products/details/${id}`} className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductEdit

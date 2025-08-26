import { Link, useParams, useNavigate } from 'react-router-dom'
import { MdEdit, MdDelete, MdArrowBack } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { productService } from '../api/productService.js'
import { categoryService } from '../api/categoryService.js'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        // For now, fetch all products and find the one with matching ID
        // In a real app, you'd have a getProductById endpoint
        const products = await productService.getProducts()
        const foundProduct = products.find(p => p._id === id)

        if (foundProduct) {
          setProduct(foundProduct)

          const categories = await categoryService.getCategories()
          const foundCategory = categories.find(cat => cat._id === foundProduct.category)
          setCategory(foundCategory)
        } else {
          setError('Product not found')
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        setError('Failed to load product details')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])


  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${product?.name}"?`)) {
      try {
        setDeleting(true)
        await productService.deleteProduct(id)
        alert('Product deleted successfully!')
        navigate('/products/list')
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Failed to delete product. Please try again.')
      } finally {
        setDeleting(false)
      }
    }
  }

  if (loading) {
    return (
      <div>
        <div className="page-header">
          <div className="page-title-section">
            <h1 className="page-title">Product Details</h1>
            <p className="page-subtitle">Loading product information...</p>
          </div>
        </div>
        <div className="content-card" style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{
            width: '24px',
            height: '24px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Loading product details...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div>
        <div className="page-header">
          <div className="page-title-section">
            <h1 className="page-title">Product Details</h1>
            <p className="page-subtitle">Product not found</p>
          </div>
          <div className="page-actions">
            <Link to="/products/list" className="btn btn-secondary">
              <MdArrowBack size={16} />
              Back to List
            </Link>
          </div>
        </div>
        <div className="content-card" style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: '#dc2626', marginBottom: '20px' }}>{error || 'Product not found'}</p>
          <Link to="/products/list" className="btn btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Product Details</h1>
          <p className="page-subtitle">View and manage product information</p>
        </div>
        <div className="page-actions">
          <Link to={`/products/edit/${id}`} className="btn btn-primary">
            <MdEdit size={16} />
            Edit Product
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-danger"
            disabled={deleting}
          >
            <MdDelete size={16} />
            {deleting ? 'Deleting...' : 'Delete Product'}
          </button>
          <Link to="/products/list" className="btn btn-secondary">
            <MdArrowBack size={16} />
            Back to List
          </Link>
        </div>
      </div>

      <div className="product-details-container">
        <div className="product-details-grid">
          <div className="product-images-section">
            <div className="main-image-container">
              <img
                className="main-product-image"
                src={product.images && product.images.length > 0 ? product.images[0].url : 'https://via.placeholder.com/300x300'}
                alt={product.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x300?text=No+Image'
                }}
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="thumbnail-gallery">
                <div className="thumbnail-scroll">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      className="thumbnail-image"
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x80?text=No+Image'
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="product-info-section">
            <div className="content-card">
              <h2>{product.name}</h2>
              <div className="product-meta">
                <span className={`status-badge ${product.stockStatus === 'InStock' ? 'active' : 'inactive'}`}>
                  {product.stockStatus === 'InStock' ? 'In Stock' : 'Out of Stock'}
                </span>
                {product.brand && (
                  <span className="brand">Brand: {product.brand}</span>
                )}
                {product.sku && (
                  <span className="sku">SKU: {product.sku}</span>
                )}
              </div>

              <div className="pricing-section">
                <div className="price-grid">
                  {product.mrp && product.mrp !== product.price && (
                    <div className="price-item">
                      <label>MRP:</label>
                      <span className="mrp-price">₹{product.mrp?.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="price-item">
                    <label>Selling Price:</label>
                    <span className="price">₹{product.price?.toLocaleString()}</span>
                  </div>
                  {product.discountPrice && product.discountPrice !== product.price && (
                    <div className="price-item">
                      <label>Discounted Price:</label>
                      <span className="discount-price">₹{product.discountPrice?.toLocaleString()}</span>
                    </div>
                  )}
                </div>
                {product.mrp && product.mrp > product.price && (
                  <div className="savings">
                    <span className="savings-text">
                      You save: ₹{(product.mrp - product.price).toLocaleString()}
                      ({(((product.mrp - product.price) / product.mrp) * 100).toFixed(0)}% off)
                    </span>
                  </div>
                )}
              </div>

              <div className="stock-section">
                <label>Stock Quantity:</label>
                <span className={`stock ${product.stockQuantity === 0 ? 'out-of-stock' : 'in-stock'}`}>
                  {product.stockQuantity || 0} units
                </span>
              </div>

              <div className="category-section">
                <label>Category:</label>
                <span>{category ? category.title : 'Unknown'}</span>
              </div>

              <div className="product-variants">
                {product.colour && (
                  <div className="variant-item">
                    <label>Color:</label>
                    <span>{product.colour}</span>
                  </div>
                )}
                {product.size && (
                  <div className="variant-item">
                    <label>Size:</label>
                    <span>{product.size}</span>
                  </div>
                )}
                {product.variants && product.variants.length > 0 && (
                  <div className="variant-item">
                    <label>Available Variants:</label>
                    <div className="variants-list">
                      {product.variants.map((variant, index) => (
                        <span key={index} className="variant-badge">{variant}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {product.weight || product.dimensions ? (
                <div className="dimensions-section">
                  <h4>Physical Details</h4>
                  {product.weight && (
                    <div className="detail-item">
                      <label>Weight:</label>
                      <span>{product.weight}</span>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="detail-item">
                      <label>Dimensions:</label>
                      <span>{product.dimensions}</span>
                    </div>
                  )}
                </div>
              ) : null}

              <div className="description-section">
                <label>Description:</label>
                <p>{product.description}</p>
              </div>

              {product.tags && product.tags.length > 0 && (
                <div className="tags-section">
                  <label>Tags:</label>
                  <div className="tags-list">
                    {product.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {product.specification && (
              <div className="content-card">
                <h3>Specifications</h3>
                <div className="specifications">
                  <p>{product.specification}</p>
                </div>
              </div>
            )}

            {(product.warranty || product.returnPolicy) && (
              <div className="content-card">
                <h3>Warranty & Returns</h3>
                {product.warranty && (
                  <div className="detail-item">
                    <label>Warranty:</label>
                    <span>{product.warranty}</span>
                  </div>
                )}
                {product.returnPolicy && (
                  <div className="detail-item">
                    <label>Return Policy:</label>
                    <span>{product.returnPolicy}</span>
                  </div>
                )}
              </div>
            )}

            {product.shipping && (
              <div className="content-card">
                <h3>Shipping Information</h3>
                <div className="detail-item">
                  <label>Delivery Charges:</label>
                  <span>{product.shipping.charges}</span>
                </div>
                <div className="detail-item">
                  <label>Delivery Time:</label>
                  <span>{product.shipping.deliveryTime}</span>
                </div>
                {product.shipping.restrictions && (
                  <div className="detail-item">
                    <label>Restrictions:</label>
                    <span>{product.shipping.restrictions}</span>
                  </div>
                )}
              </div>
            )}

            {(product.barcode || product.hsnCode) && (
              <div className="content-card">
                <h3>Product Codes</h3>
                {product.barcode && (
                  <div className="detail-item">
                    <label>Barcode:</label>
                    <span className="code">{product.barcode}</span>
                  </div>
                )}
                {product.hsnCode && (
                  <div className="detail-item">
                    <label>HSN Code:</label>
                    <span className="code">{product.hsnCode}</span>
                  </div>
                )}
              </div>
            )}

            {product.supplier && (
              <div className="content-card">
                <h3>Supplier Details</h3>
                <div className="detail-item">
                  <label>Supplier Name:</label>
                  <span>{product.supplier.name}</span>
                </div>
                {product.supplier.contact && (
                  <div className="detail-item">
                    <label>Contact:</label>
                    <span>{product.supplier.contact}</span>
                  </div>
                )}
                {product.supplier.email && (
                  <div className="detail-item">
                    <label>Email:</label>
                    <span>{product.supplier.email}</span>
                  </div>
                )}
              </div>
            )}

            <div className="content-card">
              <h3>Product History</h3>
              <div className="history-item">
                <label>Created:</label>
                <span>{new Date(product.createdAt || Date.now()).toLocaleDateString()}</span>
              </div>
              <div className="history-item">
                <label>Last Updated:</label>
                <span>{new Date(product.updatedAt || Date.now()).toLocaleDateString()}</span>
              </div>
              <div className="history-item">
                <label>Active Status:</label>
                <span>{product.isActive ? 'Active' : 'Inactive'}</span>
              </div>
              {product.status && (
                <div className="history-item">
                  <label>Status:</label>
                  <span className={`status-badge ${product.status === 'Active' ? 'active' : 'inactive'}`}>
                    {product.status}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

import { Link, useParams } from 'react-router-dom'
import { MdEdit, MdDelete, MdArrowBack } from 'react-icons/md'

function ProductDetails() {
  const { id } = useParams()
  
  // Mock product data - in real app, fetch based on id
  const product = {
    id: id,
    name: 'iPhone 14 Pro',
    category: 'Electronics',
    price: '$999',
    cost: '$750',
    stock: 25,
    sku: 'IPH14P-001',
    status: 'Active',
    description: 'The iPhone 14 Pro features a 6.1-inch Super Retina XDR display with ProMotion, A16 Bionic chip, and an advanced camera system.',
    specifications: {
      'Display': '6.1-inch Super Retina XDR',
      'Chip': 'A16 Bionic',
      'Storage': '128GB, 256GB, 512GB, 1TB',
      'Camera': 'Pro camera system',
      'Battery': 'Up to 23 hours video playback'
    },
    images: [
      'https://via.placeholder.com/400x400',
      'https://via.placeholder.com/400x400',
      'https://via.placeholder.com/400x400'
    ],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      console.log('Deleting product:', id)
      // Add delete logic here
    }
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
          <button onClick={handleDelete} className="btn btn-danger">
            <MdDelete size={16} />
            Delete Product
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
            <div className="main-image">
              <img src={product.images[0]} alt={product.name} />
            </div>
            <div className="thumbnail-images">
              {product.images.map((image, index) => (
                <img key={index} src={image} alt={`${product.name} ${index + 1}`} />
              ))}
            </div>
          </div>

          <div className="product-info-section">
            <div className="content-card">
              <h2>{product.name}</h2>
              <div className="product-meta">
                <span className={`status-badge ${product.status === 'Active' ? 'active' : 'inactive'}`}>
                  {product.status}
                </span>
                <span className="sku">SKU: {product.sku}</span>
              </div>

              <div className="price-section">
                <div className="price-item">
                  <label>Sale Price:</label>
                  <span className="price">{product.price}</span>
                </div>
                <div className="price-item">
                  <label>Cost Price:</label>
                  <span className="cost">{product.cost}</span>
                </div>
              </div>

              <div className="stock-section">
                <label>Stock Quantity:</label>
                <span className={`stock ${product.stock === 0 ? 'out-of-stock' : 'in-stock'}`}>
                  {product.stock} units
                </span>
              </div>

              <div className="category-section">
                <label>Category:</label>
                <span>{product.category}</span>
              </div>

              <div className="description-section">
                <label>Description:</label>
                <p>{product.description}</p>
              </div>
            </div>

            <div className="content-card">
              <h3>Specifications</h3>
              <div className="specifications">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="spec-item">
                    <label>{key}:</label>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="content-card">
              <h3>Product History</h3>
              <div className="history-item">
                <label>Created:</label>
                <span>{product.createdAt}</span>
              </div>
              <div className="history-item">
                <label>Last Updated:</label>
                <span>{product.updatedAt}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

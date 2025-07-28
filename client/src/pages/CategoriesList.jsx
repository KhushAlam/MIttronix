import { Link } from 'react-router-dom'
import { MdAdd, MdVisibility, MdEdit, MdDelete } from 'react-icons/md'

function CategoriesList() {
  const categories = [
    {
      id: 1,
      name: 'Electronics',
      description: 'Electronic devices and gadgets',
      productCount: 25,
      status: 'Active',
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      name: 'Computers',
      description: 'Laptops, desktops, and computer accessories',
      productCount: 15,
      status: 'Active',
      createdAt: '2024-01-12'
    },
    {
      id: 3,
      name: 'Accessories',
      description: 'Phone cases, chargers, and other accessories',
      productCount: 30,
      status: 'Active',
      createdAt: '2024-01-15'
    },
    {
      id: 4,
      name: 'Clothing',
      description: 'Apparel and fashion items',
      productCount: 0,
      status: 'Inactive',
      createdAt: '2024-01-18'
    }
  ]

  const handleDelete = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      console.log('Deleting category:', categoryId)
      // Add delete logic here
    }
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Categories</h1>
          <p className="page-subtitle">Manage product categories</p>
        </div>
        <div className="page-actions">
          <Link to="/categories/create" className="btn btn-primary">
            <MdAdd size={16} />
            Add Category
          </Link>
        </div>
      </div>

      <div className="content-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Description</th>
                <th>Products</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>
                    <span className="category-name">{category.name}</span>
                  </td>
                  <td>
                    <span className="category-description">{category.description}</span>
                  </td>
                  <td>
                    <span className="product-count">{category.productCount}</span>
                  </td>
                  <td>
                    <span className={`status ${category.status === 'Active' ? 'active' : 'inactive'}`}>
                      {category.status}
                    </span>
                  </td>
                  <td>{category.createdAt}</td>
                  <td>
                    <div className="action-buttons">
                      <Link 
                        to={`/categories/details/${category.id}`} 
                        className="action-btn view"
                        title="View Category"
                      >
                        <MdVisibility size={16} />
                      </Link>
                      <Link 
                        to={`/categories/edit/${category.id}`} 
                        className="action-btn edit"
                        title="Edit Category"
                      >
                        <MdEdit size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(category.id)}
                        className="action-btn delete"
                        title="Delete Category"
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

export default CategoriesList

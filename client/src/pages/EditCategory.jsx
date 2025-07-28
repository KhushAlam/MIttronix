import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MdArrowBack, MdSave } from 'react-icons/md'

function EditCategory() {
  const navigate = useNavigate()
  const { id } = useParams()
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active'
  })

  // Mock data - in real app this would come from API
  const categories = {
    1: { name: 'Electronics', description: 'Electronic devices and gadgets', status: 'Active' },
    2: { name: 'Computers', description: 'Laptops, desktops, and computer accessories', status: 'Active' },
    3: { name: 'Accessories', description: 'Phone cases, chargers, and other accessories', status: 'Active' },
    4: { name: 'Clothing', description: 'Apparel and fashion items', status: 'Inactive' }
  }

  useEffect(() => {
    // Load category data for editing
    if (id && categories[id]) {
      setFormData(categories[id])
    }
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Updating category:', formData)
    // Add update logic here
    navigate('/categories/list')
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Edit Category</h1>
          <p className="page-subtitle">Update category information</p>
        </div>
        <div className="page-actions">
          <Link to="/categories/list" className="btn btn-secondary">
            <MdArrowBack size={16} />
            Back to Categories
          </Link>
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="category-form">
          <div className="form-grid-single">
            <div className="content-card">
              <h3>Category Information</h3>
              
              <div className="form-group">
                <label htmlFor="name">Category Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter category name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Enter category description..."
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
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              <MdSave size={16} />
              Update Category
            </button>
            <Link to="/categories/list" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCategory

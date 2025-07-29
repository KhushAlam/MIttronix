import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack, MdSave } from "react-icons/md";
import { categoryService } from "../api/categoryService"; // Assuming this service exists and works

function CreateCategory() {
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
    parent: "",
  });

  // State for UI and data
  const [parentCategories, setParentCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch parent categories on component mount
  useEffect(() => {
    const fetchParentCategories = async () => {
      try {
        // This should be replaced with a real API call
        // const categories = await categoryService.getAllCategories();
        const mockParentCategories = [
          { _id: "1", title: "Electronics" },
          { _id: "2", title: "Computers" },
          { _id: "3", title: "Clothing" },
        ];
        setParentCategories(mockParentCategories);
      } catch (err) {
        console.error("Error fetching parent categories:", err);
        setError("Failed to load parent categories.");
      }
    };
    fetchParentCategories();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name) {
      setError("Please fill in the Category Name.");
      return;
    }

    setLoading(true);
    try {
      const categoryData = {
        ...formData,
        parent: formData.parent || null, // Ensure parent is null if empty
      };

      // In a real app, 'title' might be what the API expects
      // Make sure the key matches the API (e.g., name vs title)
      const dataToSend = {
          title: categoryData.name, // Or just 'name' if API expects that
          description: categoryData.description,
          status: categoryData.status,
          parent: categoryData.parent,
      };

      console.log("Submitting data:", dataToSend);
      const result = await categoryService.createCategory(dataToSend);
      console.log("Category creation result", result);

      setSuccess("Category created successfully!");

      setTimeout(() => navigate("/categories/list"), 1500);

    } catch (err) {
      console.error('Error creating category:', err);
      setError(err.message || 'Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Create Category</h1>
          <p className="page-subtitle">Add a new product category</p>
        </div>
        <div className="page-actions">
          <Link to="/categories/list" className="btn btn-secondary">
            <MdArrowBack size={16} />
            Back to Categories
          </Link>
        </div>
      </div>

      <div className="form-container">
        {/* Added error/success message display */}
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

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
                <label htmlFor="parent">Parent Category (Optional)</label>
                <select
                  id="parent"
                  name="parent"
                  value={formData.parent}
                  onChange={handleInputChange}
                >
                  <option value="">-- No Parent --</option>
                  {parentCategories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  ))}
                </select>
                <small className="form-hint">Leave empty for a main category.</small>
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
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <MdSave size={16} />
              {loading ? "Creating..." : "Create Category"}
            </button>
            <Link to="/categories/list" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCategory;
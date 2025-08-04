import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    MdAdd, 
    MdSearch, 
    MdEdit, 
    MdDelete, 
    MdVisibility,
    MdPublish,
    MdUnpublished,
    MdStar,
    MdStarBorder,
    MdDrafts,
    MdArticle,
} from 'react-icons/md';
import blogService from '../api/blogService';

function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        published: 0,
        draft: 0,
        featured: 0,
        totalViews: 0,
        totalLikes: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [pagination, setPagination] = useState({});
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        search: '',
        status: '',
        category: '',
        featured: '',
        sortBy: 'createdAt',
        sortOrder: 'desc'
    });

    useEffect(() => {
        fetchBlogs();
        fetchStats();
    }, [filters]);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await blogService.getAll(filters);
            setBlogs(response.data);
            setPagination(response.pagination);
        } catch (error) {
            setError(error.message || 'Failed to fetch blogs');
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await blogService.getStats();
            setStats(response); 
        } catch (error) {
            setStats({
                total: 0,
                published: 0,
                draft: 0,
                featured: 0,
                totalViews: 0,
                totalLikes: 0
            });
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            page: key !== 'page' ? 1 : value
        }));
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await blogService.delete(id);
                fetchBlogs();
                fetchStats();
            } catch (error) {
                setError(error.message || 'Failed to delete blog');
            }
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Published' ? 'Draft' : 'Published';
        try {
            await blogService.toggleStatus(id, newStatus);
            fetchBlogs();
            fetchStats();
        } catch (error) {
            setError(error.message || 'Failed to update blog status');
        }
    };

    const handleToggleFeatured = async (id) => {
        try {
            await blogService.toggleFeatured(id);
            fetchBlogs();
            fetchStats();
        } catch (error) {
            setError(error.message || 'Failed to update featured status');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Published': return 'status-published';
            case 'Draft': return 'status-draft';
            case 'Archived': return 'status-archived';
            default: return 'status-default';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <div className="page-title-section">
                    <h1>Blog Management</h1>
                </div>
                    <div className="page-actions">
                        <Link to="/blogs/create" className="btn btn-primary">
                            <MdAdd size={20} />
                            Create Blog
                        </Link>
                    </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stats-card">
                    <div className="stats-icon published">
                        <MdArticle size={24} />
                    </div>
                    <div className="stats-content">
                        <h3>{stats.published || 0}</h3>
                        <p>Published</p>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-icon draft">
                        <MdDrafts size={24} />
                    </div>
                    <div className="stats-content">
                        <h3>{stats.draft || 0}</h3>
                        <p>Drafts</p>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-icon featured">
                        <MdStar size={24} />
                    </div>
                    <div className="stats-content">
                        <h3>{stats.featured || 0}</h3>
                        <p>Featured</p>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-icon views">
                        <MdVisibility size={24} />
                    </div>
                    <div className="stats-content">
                        <h3>{stats.totalViews || 0}</h3>
                        <p>Total Views</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="content-card">
                <div className="filters-section">
                    <div className="search-box">
                        <MdSearch size={20} />
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                        />
                    </div>
                    
                    <div className="filter-group">
                        <select
                            value={filters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="Published">Published</option>
                            <option value="Draft">Draft</option>
                            <option value="Archived">Archived</option>
                        </select>

                        <select
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                        >
                            <option value="">All Categories</option>
                            <option value="Technology">Technology</option>
                            <option value="Business">Business</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Health">Health</option>
                            <option value="Education">Education</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Sports">Sports</option>
                            <option value="Travel">Travel</option>
                            <option value="Food">Food</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Other">Other</option>
                        </select>

                        <select
                            value={filters.featured}
                            onChange={(e) => handleFilterChange('featured', e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="true">Featured Only</option>
                            <option value="false">Not Featured</option>
                        </select>
                    </div>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="content-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <p>Loading blogs...</p>
                    </div>
                ) : (
                    <>
                        <div className="data-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Category</th>
                                        <th>Status</th>
                                        <th>Views</th>
                                        <th>Featured</th>
                                        <th>Created</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogs.map((blog) => (
                                        <tr key={blog.id}>
                                            <td>
                                                <div className="title-cell">
                                                    <strong>{blog.title}</strong>
                                                    {blog.excerpt && (
                                                        <p className="excerpt-preview">
                                                            {blog.excerpt.substring(0, 80)}...
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <span>{blog.author?.name || 'Unknown'}</span>
                                            </td>
                                            <td>
                                                <span className="category-badge">{blog.category}</span>
                                            </td>
                                            <td>
                                                <span className={`status-badge ${getStatusColor(blog.status)}`}>
                                                    {blog.status}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="view-count">{blog.views || 0}</span>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleToggleFeatured(blog.id)}
                                                    className={`btn btn-sm ${blog.isFeatured ? 'btn-warning' : 'btn-ghost'}`}
                                                    title={blog.isFeatured ? 'Remove from featured' : 'Mark as featured'}
                                                >
                                                    {blog.isFeatured ? <MdStar size={16} /> : <MdStarBorder size={16} />}
                                                </button>
                                            </td>
                                            <td>
                                                <span className="date-text">
                                                    {formatDate(blog.createdAt)}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <Link
                                                        to={`/blogs/${blog.id}`}
                                                        className="action-btn view"
                                                        title="View"
                                                    >
                                                        <MdVisibility size={16} />
                                                    </Link>
                                                    <Link
                                                        to={`/blogs/${blog.id}/edit`}
                                                        className="action-btn edit"
                                                        title="Edit"
                                                    >
                                                        <MdEdit size={16} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleToggleStatus(blog.id, blog.status)}
                                                        className="action-btn edit"
                                                        title={blog.status === 'Published' ? 'Unpublish' : 'Publish'}
                                                    >
                                                        {blog.status === 'Published' ?
                                                            <MdUnpublished size={16} /> :
                                                            <MdPublish size={16} />
                                                        }
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(blog.id)}
                                                        className="action-btn delete"
                                                        title="Delete"
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

                        {/* Pagination */}
                        {pagination.total > 1 && (
                            <div className="pagination">
                                <button
                                    className="btn btn-sm"
                                    disabled={!pagination.current || pagination.current <= 1}
                                    onClick={() => handleFilterChange('page', pagination.current - 1)}
                                >
                                    Previous
                                </button>
                                
                                <span className="pagination-info">
                                    Page {pagination.current} of {pagination.total}
                                </span>
                                
                                <button
                                    className="btn btn-sm"
                                    disabled={!pagination.current || !pagination.total || pagination.current >= pagination.total}
                                    onClick={() => handleFilterChange('page', pagination.current + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default BlogList;

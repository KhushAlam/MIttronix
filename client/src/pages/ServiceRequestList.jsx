import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {
  MdAdd,
  MdSearch,
  MdEdit,
  MdDelete,
  MdAssignment,
  MdVisibility,
  MdPriorityHigh,
  MdAccessTime,
  MdCheckCircle,
} from "react-icons/md";
import serviceRequestService from '../api/serviceRequestService';

function ServiceRequestList() {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [stats, setStats] = useState({
    overview: {
      open: 0,
      inProgress: 0,
      resolved: 0,
      closed: 0
    },
    byPriority: {
      high: 0,
      medium: 0,
      low: 0
    },
    total: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    category: "",
    type: "",
    priority: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  useEffect(() => {
    fetchServiceRequests();
    fetchStats();
  }, [filters]);

  const fetchServiceRequests = async () => {
    try {
      setLoading(true);
      const response = await serviceRequestService.getAll(filters);
      setServiceRequests(response.data);
      setPagination(response.pagination);
    } catch (error) {
      setError(error.message || "Failed to fetch service requests");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await serviceRequestService.getStats();
      setStats(response); // Fixed: remove .data since service returns stats directly
    } catch (error) {
      // API endpoint not available - use fallback stats silently
      setStats({
        overview: {
          open: 0,
          inProgress: 0,
          resolved: 0,
          closed: 0
        },
        byPriority: {
          high: 0,
          medium: 0,
          low: 0
        },
        total: 0
      });
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key !== "page" ? 1 : value,
    }));
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this service request?")
    ) {
      try {
        await serviceRequestService.delete(id);
        fetchServiceRequests();
        fetchStats();
      } catch (error) {
        setError(error.message || "Failed to delete service request");
      }
    }
  };

  

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "status-open";
      case "In Progress":
        return "status-in-progress";
      case "Resolved":
        return "status-resolved";
      case "Closed":
        return "status-closed";
      default:
        return "status-default";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "priority-critical";
      case "High":
        return "priority-high";
      case "Medium":
        return "priority-medium";
      case "Low":
        return "priority-low";
      default:
        return "priority-default";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Service Requests</h1>
          <p className="page-subtitle">Service requests raised by users</p>
        </div>
        <div className="page-actions">
          <Link to="/service-requests/create" className="btn btn-primary">
            <MdAdd size={20} />
            New Request
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stats-card">
          <div className="stats-icon open">
            <MdAccessTime size={24} />
          </div>
          <div className="stats-content">
            <h3>{stats.overview?.open || 0}</h3>
            <p>Open</p>
          </div>
        </div>
        <div className="stats-card">
          <div className="stats-icon in-progress">
            <MdAssignment size={24} />
          </div>
          <div className="stats-content">
            <h3>{stats.overview?.inProgress || 0}</h3>
            <p>In Progress</p>
          </div>
        </div>
        <div className="stats-card">
          <div className="stats-icon resolved">
            <MdCheckCircle size={24} />
          </div>
          <div className="stats-content">
            <h3>{stats.overview?.resolved || 0}</h3>
            <p>Resolved</p>
          </div>
        </div>
        <div className="stats-card">
          <div className="stats-icon critical">
            <MdPriorityHigh size={24} />
          </div>
          <div className="stats-content">
            <h3>{stats.byPriority?.high || 0}</h3>
            <p>High Priority</p>
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
              placeholder="Search by ticket ID, title, or user..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          <div className="filter-group">
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>

            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Demo">Demo</option>
              <option value="Repair">Repair</option>
              <option value="Delivery">Delivery</option>
              <option value="Relocation">Relocation</option>
            </select>

            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange("priority", e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="content-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p>Loading service requests...</p>
          </div>
        ) : (
          <>
            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Ticket ID</th>
                    <th>Product</th>
                    <th>User</th>
                    <th>Type</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Order ID</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceRequests.map((request) => (
                    <tr key={request.id}>
                      <td>
                        <span className="ticket-id">{request.id}</span>
                      </td>
                      <td>
                        <div className="product-cell">
                          <strong>{request.product}</strong>
                          {request.description && (
                            <p className="description-preview">
                              {request.description.substring(0, 60)}...
                            </p>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="user-info">
                          <strong>{request.userInfo.name}</strong>
                          <br />
                          <small>{request.userInfo.email}</small>
                        </div>
                      </td>
                      <td>
                        <span className="type-badge">
                          {request.type}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`priority-badge ${getPriorityColor(
                            request.priority
                          )}`}
                        >
                          {request.priority}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`status-badge ${getStatusColor(
                            request.status
                          )}`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td>
                        <span className="order-id">{request.orderId}</span>
                      </td>
                      <td>
                        <span className="date-text">
                          {formatDate(request.createdAt)}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <Link
                            to={`/service-requests/${request.id}`}
                            className="action-btn view"
                            title="View Details"
                          >
                            <MdVisibility size={16} />
                          </Link>
                          <Link
                            to={`/service-requests/${request.id}/edit`}
                            className="action-btn edit"
                            title="Edit"
                          >
                            <MdEdit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(request.id)}
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
                  disabled={pagination.current === 1}
                  onClick={() =>
                    handleFilterChange("page", pagination.current - 1)
                  }
                >
                  Previous
                </button>

                <span className="pagination-info">
                  Page {pagination.current} of {pagination.total}
                </span>

                <button
                  className="btn btn-sm"
                  disabled={pagination.current === pagination.total}
                  onClick={() =>
                    handleFilterChange("page", pagination.current + 1)
                  }
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

export default ServiceRequestList;

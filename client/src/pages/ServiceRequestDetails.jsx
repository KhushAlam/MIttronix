import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MdArrowBack, MdEdit, MdAssignment, MdPerson, MdAccessTime, MdPriorityHigh } from 'react-icons/md'
import serviceRequestService from '../api/serviceRequestService'

function ServiceRequestDetails() {
  const { id } = useParams()
  const [serviceRequest, setServiceRequest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      loadServiceRequestData()
    }
  }, [id])

  const loadServiceRequestData = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await serviceRequestService.getById(id)
      setServiceRequest(data)
    } catch (error) {
      console.error('Error loading service request:', error)
      setError('Failed to load service request data')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'status-warning'
      case 'In Progress': return 'status-info'
      case 'Resolved': return 'status-success'
      case 'Closed': return 'status-secondary'
      default: return 'status-secondary'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'priority-high'
      case 'Medium': return 'priority-medium'
      case 'Low': return 'priority-low'
      default: return 'priority-medium'
    }
  }

  if (loading) {
    return (
      <div>
        <div className="page-header">
          <div className="page-title-section">
            <h1 className="page-title">Service Request Details</h1>
            <p className="page-subtitle">Loading service request...</p>
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
          <p>Loading service request details...</p>
        </div>
      </div>
    )
  }

  if (error || !serviceRequest) {
    return (
      <div>
        <div className="page-header">
          <div className="page-title-section">
            <h1 className="page-title">Service Request Details</h1>
            <p className="page-subtitle">Error loading service request</p>
          </div>
          <div className="page-actions">
            <Link to="/service-requests" className="btn btn-secondary">
              <MdArrowBack size={16} />
              Back to Service Requests
            </Link>
          </div>
        </div>
        <div className="content-card" style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: '#dc2626', marginBottom: '20px' }}>
            ❌ {error || 'Service request not found'}
          </p>
          <Link to="/service-requests" className="btn btn-primary">
            Back to Service Requests List
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Service Request Details</h1>
          <p className="page-subtitle">#{serviceRequest.id}</p>
        </div>
        <div className="page-actions">
          <Link to="/service-requests" className="btn btn-secondary">
            <MdArrowBack size={16} />
            Back to Service Requests
          </Link>
          <Link to={`/service-requests/${id}/edit`} className="btn btn-primary">
            <MdEdit size={16} />
            Edit
          </Link>
        </div>
      </div>

      <div className="service-request-details-container">
        {/* Summary Card */}
        <div className="content-card">
          <div className="service-request-summary">
            <div className="summary-header">
              <div className="request-info">
                <h3>{serviceRequest.type} Request</h3>
                <p className="request-date">Created on {new Date(serviceRequest.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="request-badges">
                <span className={`status-badge ${getStatusColor(serviceRequest.status)}`}>
                  {serviceRequest.status}
                </span>
                <span className={`priority-badge ${getPriorityColor(serviceRequest.priority)}`}>
                  <MdPriorityHigh size={16} />
                  {serviceRequest.priority}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="details-content-grid">
          {/* Request Information */}
          <div className="content-card">
            <h3><MdAssignment size={20} /> Request Information</h3>
            <div className="request-info-grid">
              <div className="info-group">
                <h4>Order Details</h4>
                <p><strong>Order ID:</strong> {serviceRequest.orderId}</p>
                <p><strong>Product:</strong> {serviceRequest.product}</p>
                <p><strong>Category:</strong> {serviceRequest.category}</p>
              </div>
              <div className="info-group">
                <h4>Description</h4>
                <p>{serviceRequest.description}</p>
              </div>
              {serviceRequest.resolution && (
                <div className="info-group">
                  <h4>Resolution</h4>
                  <p>{serviceRequest.resolution}</p>
                </div>
              )}
            </div>
          </div>

          {/* Customer Information */}
          <div className="content-card">
            <h3><MdPerson size={20} /> Customer Information</h3>
            <div className="customer-info">
              <div className="info-group">
                <h4>Contact Details</h4>
                <p><strong>Name:</strong> {serviceRequest.userInfo.name}</p>
                <p><strong>Email:</strong> {serviceRequest.userInfo.email}</p>
                <p><strong>Phone:</strong> {serviceRequest.userInfo.phone}</p>
              </div>
              <div className="info-group">
                <h4>Assignment</h4>
                <p><strong>Assigned To:</strong> {serviceRequest.assignedTo}</p>
                {serviceRequest.estimatedResolution && (
                  <p><strong>Expected Resolution:</strong> {new Date(serviceRequest.estimatedResolution).toLocaleDateString()}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="content-card">
          <h3><MdAccessTime size={20} /> Timeline</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker completed"></div>
              <div className="timeline-content">
                <h4>Request Created</h4>
                <p>{new Date(serviceRequest.createdAt).toLocaleString()}</p>
              </div>
            </div>
            {serviceRequest.updatedAt !== serviceRequest.createdAt && (
              <div className="timeline-item">
                <div className="timeline-marker completed"></div>
                <div className="timeline-content">
                  <h4>Last Updated</h4>
                  <p>{new Date(serviceRequest.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            )}
            {serviceRequest.status === 'Resolved' && (
              <div className="timeline-item">
                <div className="timeline-marker completed"></div>
                <div className="timeline-content">
                  <h4>Request Resolved</h4>
                  <p>Resolution provided</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceRequestDetails

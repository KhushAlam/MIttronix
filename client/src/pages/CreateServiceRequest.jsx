import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    MdSave, 
    MdCancel
} from 'react-icons/md';
import serviceRequestService from '../api/serviceRequestService';

function CreateServiceRequest() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const [formData, setFormData] = useState({
        type: 'Repair',
        orderId: '',
        product: '',
        paymentDetails: '',
        description: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.type || !formData.orderId || !formData.product || !formData.description) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const submitData = {
                title: `${formData.type} Request - Order ${formData.orderId}`,
                description: formData.description,
                category: formData.type,
                priority: 'Medium',
                status: 'Open',
                userInfo: {
                    name: 'Admin User',
                    email: 'admin@example.com',
                    phone: '+1234567890'
                },
                customFields: {
                    orderId: formData.orderId,
                    product: formData.product,
                    paymentDetails: formData.paymentDetails
                }
            };

            await serviceRequestService.create(submitData);
            navigate('/service-requests');
        } catch (error) {
            setError(error.message || 'Failed to create service request');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/service-requests');
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <div className="header-content">
                    <h1>Create New Service Request</h1>
                </div>
            </div>

            <div className="content-card">
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="form-layout">
                    {/* Form Fields */}
                    <div className="form-section">
                        <div className="form-grid-aligned">
                            <div className="form-group">
                                <label htmlFor="type">Type *</label>
                                <select
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    required
                                    className="form-control"
                                >
                                    <option value="Repair">Repair</option>
                                    <option value="Relocation">Relocation</option>
                                    <option value="Demo">Demo</option>
                                    <option value="Delivery">Delivery</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="orderId">Order ID *</label>
                                <input
                                    type="text"
                                    id="orderId"
                                    name="orderId"
                                    value={formData.orderId}
                                    onChange={handleInputChange}
                                    placeholder="Enter Order ID"
                                    required
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="product">Product *</label>
                                <input
                                    type="text"
                                    id="product"
                                    name="product"
                                    value={formData.product}
                                    onChange={handleInputChange}
                                    placeholder="Enter Product Name"
                                    required
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group form-group-full">
                                <label htmlFor="paymentDetails">Payment Details</label>
                                <textarea
                                    id="paymentDetails"
                                    name="paymentDetails"
                                    value={formData.paymentDetails}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Transaction ID, Payment Mode, Amount"
                                    rows={4}
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group form-group-full">
                                <label htmlFor="description">Description *</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Describe the service request in detail"
                                    rows={6}
                                    required
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Form Actions - Bottom Right */}
                    <div className="form-actions-bottom-right">
                         <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            <MdSave size={20} />
                            {loading ? 'Creating...' : 'Create Request'}
                        </button>
                        
                        <button 
                            type="button" 
                            onClick={handleCancel}
                            className="btn btn-secondary"
                            disabled={loading}
                            style={{ marginLeft: '1%' }}
                        >
                            <MdCancel size={20} />
                            Cancel
                        </button>
                        
                       
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateServiceRequest;

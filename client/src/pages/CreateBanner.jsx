import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MdSave,
    MdCancel,
    MdImage,
    MdSchedule,
    MdLocationOn,
    MdPeople,
    MdLink,
    MdVisibility,
    MdCalendarToday
} from 'react-icons/md';
import bannerService from '../api/bannerService';

function CreateBanner() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        imageAlt: '',
        link: '',
        linkTarget: '_self',
        placement: 'homepage-hero',
        targetAudience: 'All Users',
        status: 'inactive',
        startDate: '',
        endDate: '',
        priority: 1,
        isClickable: true,
        trackingEnabled: true,
        notes: ''
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e, status = 'inactive') => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.imageUrl.trim()) {
            setError('Title and image URL are required');
            return;
        }

        if (!formData.startDate || !formData.endDate) {
            setError('Start date and end date are required');
            return;
        }

        if (new Date(formData.startDate) >= new Date(formData.endDate)) {
            setError('End date must be after start date');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const submitData = {
                ...formData,
                status,
                startDate: new Date(formData.startDate).toISOString(),
                endDate: new Date(formData.endDate).toISOString(),
                createdBy: 'Admin User'
            };

            await bannerService.create(submitData);
            navigate('/banners');
        } catch (error) {
            setError(error.message || 'Failed to create banner');
        } finally {
            setLoading(false);
        }
    };

    const placementOptions = [
        { value: 'homepage-hero', label: 'Homepage Hero' },
        { value: 'homepage-sidebar', label: 'Homepage Sidebar' },
        { value: 'product-page-sidebar', label: 'Product Page Sidebar' },
        { value: 'category-page-header', label: 'Category Page Header' },
        { value: 'checkout-page', label: 'Checkout Page' },
        { value: 'cart-page', label: 'Cart Page' },
        { value: 'search-results', label: 'Search Results' },
        { value: 'footer', label: 'Footer' },
        { value: 'mobile-app-banner', label: 'Mobile App Banner' }
    ];

    const audienceOptions = [
        { value: 'All Users', label: 'All Users' },
        { value: 'Registered Users', label: 'Registered Users' },
        { value: 'Guest Users', label: 'Guest Users' },
        { value: 'VIP Customers', label: 'VIP Customers' },
        { value: 'New Customers', label: 'New Customers' },
        { value: 'Cart Users', label: 'Users with Cart Items' },
        { value: 'Frequent Buyers', label: 'Frequent Buyers' }
    ];

    return (
        <div>
            <div className="page-header">
                <div className="page-title-section">
                    <h1 className="page-title">Create New Banner</h1>
                    <p className="page-subtitle">Design and configure promotional banners</p>
                </div>
                <div className="header-actions">
                    <button
                        type="button"
                        onClick={() => navigate('/banners')}
                        className="btn btn-secondary"
                    >
                        <MdCancel size={20} />
                        Cancel
                    </button>
                </div>
            </div>

            <div className="content-card">
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={(e) => handleSubmit(e, 'inactive')} className="banner-form">
                    {/* Basic Information */}
                    <div className="form-section">
                        <div className="section-header">
                            <MdImage className="section-icon" />
                            <h3>Basic Information</h3>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="title">Banner Title *</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter banner title"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="priority">Priority</label>
                                <select
                                    id="priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleInputChange}
                                >
                                    <option value={1}>High (1)</option>
                                    <option value={2}>Medium (2)</option>
                                    <option value={3}>Low (3)</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter banner description"
                                rows={3}
                            />
                        </div>
                    </div>

                    {/* Image Configuration */}
                    <div className="form-section">
                        <div className="section-header">
                            <MdImage className="section-icon" />
                            <h3>Image Configuration</h3>
                        </div>

                        <div className="form-group">
                            <label htmlFor="imageUrl">Image URL *</label>
                            <input
                                type="url"
                                id="imageUrl"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleInputChange}
                                placeholder="https://example.com/banner-image.jpg"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="imageAlt">Image Alt Text</label>
                            <input
                                type="text"
                                id="imageAlt"
                                name="imageAlt"
                                value={formData.imageAlt}
                                onChange={handleInputChange}
                                placeholder="Descriptive text for accessibility"
                            />
                        </div>

                        {formData.imageUrl && (
                            <div className="image-preview">
                                <h4>Image Preview:</h4>
                                <img
                                    src={formData.imageUrl}
                                    alt={formData.imageAlt || 'Banner preview'}
                                    className="preview-image"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Link Configuration */}
                    <div className="form-section">
                        <div className="section-header">
                            <MdLink className="section-icon" />
                            <h3>Link Configuration</h3>
                        </div>

                        <div className="form-row">
                            <div className="form-group checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="isClickable"
                                        checked={formData.isClickable}
                                        onChange={handleInputChange}
                                    />
                                    <span className="checkbox-text">Make banner clickable</span>
                                </label>
                            </div>
                        </div>

                        {formData.isClickable && (
                            <>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="link">Destination URL</label>
                                        <input
                                            type="url"
                                            id="link"
                                            name="link"
                                            value={formData.link}
                                            onChange={handleInputChange}
                                            placeholder="https://example.com/destination"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="linkTarget">Link Target</label>
                                        <select
                                            id="linkTarget"
                                            name="linkTarget"
                                            value={formData.linkTarget}
                                            onChange={handleInputChange}
                                        >
                                            <option value="_self">Same Window</option>
                                            <option value="_blank">New Window</option>
                                        </select>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Placement & Targeting */}
                    <div className="form-section">
                        <div className="section-header">
                            <MdLocationOn className="section-icon" />
                            <h3>Placement & Targeting</h3>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="placement">Placement Location *</label>
                                <select
                                    id="placement"
                                    name="placement"
                                    value={formData.placement}
                                    onChange={handleInputChange}
                                    required
                                >
                                    {placementOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="targetAudience">Target Audience</label>
                                <select
                                    id="targetAudience"
                                    name="targetAudience"
                                    value={formData.targetAudience}
                                    onChange={handleInputChange}
                                >
                                    {audienceOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Schedule Configuration */}
                    <div className="form-section">
                        <div className="section-header">
                            <MdSchedule className="section-icon" />
                            <h3>Schedule Configuration</h3>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="startDate">Start Date *</label>
                                <input
                                    type="datetime-local"
                                    id="startDate"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="endDate">End Date *</label>
                                <input
                                    type="datetime-local"
                                    id="endDate"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Advanced Settings */}
                    <div className="form-section">
                        <div className="section-header">
                            <MdVisibility className="section-icon" />
                            <h3>Advanced Settings</h3>
                        </div>

                        <div className="form-row">
                            <div className="form-group checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="trackingEnabled"
                                        checked={formData.trackingEnabled}
                                        onChange={handleInputChange}
                                    />
                                    <span className="checkbox-text">Enable click tracking</span>
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="notes">Internal Notes</label>
                            <textarea
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleInputChange}
                                placeholder="Internal notes for team reference"
                                rows={3}
                            />
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="form-actions">
                        <button
                            type="submit"
                            className="btn btn-secondary"
                            disabled={loading}
                        >
                            <MdSave size={20} />
                            {loading ? 'Saving...' : 'Save as Draft'}
                        </button>

                        <button
                            type="button"
                            onClick={(e) => handleSubmit(e, 'active')}
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            <MdVisibility size={20} />
                            {loading ? 'Publishing...' : 'Save & Activate'}
                        </button>
                    </div>
                </form>
            </div>

            <style>{`
                .banner-form {
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                    max-width: 1000px;
                    margin: 0 auto;
                }

                .form-section {
                    background: #f8f9fa;
                    border-radius: 8px;
                    padding: 24px;
                    border: 1px solid #e9ecef;
                }

                .section-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 20px;
                    padding-bottom: 12px;
                    border-bottom: 2px solid #e9ecef;
                }

                .section-icon {
                    color: #ffc007;
                    font-size: 20px;
                }

                .section-header h3 {
                    font-size: 18px;
                    font-weight: 600;
                    color: #333;
                    margin: 0;
                }

                .form-row {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-bottom: 20px;
                }

                .form-row:last-child {
                    margin-bottom: 0;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .form-group label {
                    font-weight: 500;
                    color: #333;
                    font-size: 14px;
                }

                .form-group input,
                .form-group select,
                .form-group textarea {
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    font-size: 14px;
                    transition: all 0.2s;
                    background: white;
                }

                .form-group input:focus,
                .form-group select:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: #ffc007;
                    box-shadow: 0 0 0 2px rgba(255, 192, 7, 0.2);
                }

                .checkbox-group {
                    flex-direction: row;
                    align-items: center;
                }

                .checkbox-label {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    font-weight: 500;
                    color: #333;
                }

                .checkbox-label input[type="checkbox"] {
                    width: auto;
                    margin: 0;
                }

                .checkbox-text {
                    user-select: none;
                }

                .image-preview {
                    margin-top: 16px;
                    padding: 16px;
                    background: white;
                    border-radius: 6px;
                    border: 1px solid #e9ecef;
                }

                .image-preview h4 {
                    font-size: 14px;
                    color: #333;
                    margin: 0 0 12px 0;
                }

                .preview-image {
                    max-width: 100%;
                    max-height: 200px;
                    border-radius: 6px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .form-actions {
                    display: flex;
                    gap: 12px;
                    justify-content: flex-end;
                    margin-top: 20px;
                    padding-top: 24px;
                    border-top: 1px solid #e9ecef;
                }

                .btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 24px;
                    border: none;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    white-space: nowrap;
                }

                .btn:hover:not(:disabled) {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }

                .btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none;
                }

                .btn-primary {
                    background: #ffc007;
                    color: #333;
                }

                .btn-primary:hover:not(:disabled) {
                    background: #e6ac06;
                }

                .btn-secondary {
                    background: #74b9ff;
                    color: white;
                }

                .btn-secondary:hover:not(:disabled) {
                    background: #0984e3;
                }

                .error-message {
                    background: #f8d7da;
                    color: #721c24;
                    padding: 12px 16px;
                    border-radius: 6px;
                    margin-bottom: 20px;
                    border: 1px solid #f5c6cb;
                    border-left: 4px solid #dc3545;
                }

                @media (max-width: 768px) {
                    .form-row {
                        grid-template-columns: 1fr;
                        gap: 16px;
                    }

                    .form-section {
                        padding: 16px;
                    }

                    .form-actions {
                        flex-direction: column;
                        gap: 8px;
                    }

                    .btn {
                        justify-content: center;
                        width: 100%;
                    }
                }

                @media (max-width: 480px) {
                    .section-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 8px;
                    }

                    .checkbox-group {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                }
            `}</style>
        </div>
    );
}

export default CreateBanner;

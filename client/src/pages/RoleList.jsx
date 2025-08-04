import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    MdAdd,
    MdSearch,
    MdEdit,
    MdDelete,
    MdSecurity,
    MdPeople,
    MdContentCopy,
    MdToggleOn,
    MdToggleOff,
    MdShield,
    MdVerifiedUser,
    MdAdminPanelSettings,
    MdGroup
} from 'react-icons/md';
import roleService from '../api/roleService';

function RoleList() {
    const [roles, setRoles] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [pagination, setPagination] = useState({});
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        search: '',
        status: '',
        sortBy: 'createdAt',
        sortOrder: 'desc'
    });

    // Mock data for demonstration
    const mockRoles = [
        {
            _id: '1',
            name: 'Super Administrator',
            description: 'Full system access with all permissions',
            permissions: [
                { module: 'users', actions: ['create', 'read', 'update', 'delete'] },
                { module: 'products', actions: ['create', 'read', 'update', 'delete'] },
                { module: 'orders', actions: ['create', 'read', 'update', 'delete'] },
                { module: 'analytics', actions: ['read'] },
                { module: 'settings', actions: ['read', 'update'] }
            ],
            userCount: 2,
            status: 'active',
            isSystemRole: true,
            createdAt: '2024-01-15T10:00:00Z',
            createdBy: 'System'
        },
        {
            _id: '2',
            name: 'Store Manager',
            description: 'Manage products, orders, and customer service',
            permissions: [
                { module: 'products', actions: ['create', 'read', 'update', 'delete'] },
                { module: 'orders', actions: ['read', 'update'] },
                { module: 'customers', actions: ['read', 'update'] },
                { module: 'analytics', actions: ['read'] }
            ],
            userCount: 5,
            status: 'active',
            isSystemRole: false,
            createdAt: '2024-02-10T14:30:00Z',
            createdBy: 'Admin User'
        },
        {
            _id: '3',
            name: 'Customer Service',
            description: 'Handle customer inquiries and support',
            permissions: [
                { module: 'customers', actions: ['read', 'update'] },
                { module: 'orders', actions: ['read', 'update'] },
                { module: 'support', actions: ['create', 'read', 'update'] }
            ],
            userCount: 8,
            status: 'active',
            isSystemRole: false,
            createdAt: '2024-02-20T09:15:00Z',
            createdBy: 'HR Manager'
        },
        {
            _id: '4',
            name: 'Content Editor',
            description: 'Manage blogs, banners, and website content',
            permissions: [
                { module: 'blogs', actions: ['create', 'read', 'update', 'delete'] },
                { module: 'banners', actions: ['create', 'read', 'update', 'delete'] },
                { module: 'categories', actions: ['read', 'update'] }
            ],
            userCount: 3,
            status: 'active',
            isSystemRole: false,
            createdAt: '2024-03-05T11:45:00Z',
            createdBy: 'Marketing Lead'
        },
        {
            _id: '5',
            name: 'Viewer',
            description: 'Read-only access for reporting and analytics',
            permissions: [
                { module: 'analytics', actions: ['read'] },
                { module: 'orders', actions: ['read'] },
                { module: 'products', actions: ['read'] }
            ],
            userCount: 12,
            status: 'inactive',
            isSystemRole: false,
            createdAt: '2024-03-15T16:20:00Z',
            createdBy: 'Admin User'
        }
    ];

    const mockStats = {
        overview: {
            total: 5,
            active: 4,
            inactive: 1,
            totalUsers: 30,
            systemRoles: 1,
            customRoles: 4
        }
    };

    useEffect(() => {
        fetchRoles();
        fetchStats();
    }, [filters]);

    const fetchRoles = async () => {
        try {
            setLoading(true);
            setError('');
            
            try {
                const response = await roleService.getAll(filters);
                setRoles(response.data);
                setPagination(response.pagination);
            } catch (apiError) {
                // Use mock data when API fails
                console.log('API unavailable, using mock data');
                setRoles(mockRoles);
                setPagination({ current: 1, total: 1, pages: 1 });
            }
        } catch (error) {
            setError('Failed to load roles');
            setRoles([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await roleService.getStats();
            setStats(response.data);
        } catch (error) {
            // Use mock stats when API fails
            setStats(mockStats);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            page: key !== 'page' ? 1 : value
        }));
    };

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            await roleService.toggleStatus(id);
            fetchRoles();
            fetchStats();
        } catch (error) {
            setError(error.message || 'Failed to update role status');
        }
    };

    const handleDuplicate = async (id) => {
        try {
            await roleService.duplicate(id);
            fetchRoles();
        } catch (error) {
            setError(error.message || 'Failed to duplicate role');
        }
    };

    const handleDelete = async (id, isSystemRole) => {
        if (isSystemRole) {
            setError('System roles cannot be deleted');
            return;
        }

        if (window.confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
            try {
                await roleService.delete(id);
                fetchRoles();
                fetchStats();
            } catch (error) {
                setError(error.message || 'Failed to delete role');
            }
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'status-success';
            case 'inactive': return 'status-secondary';
            default: return 'status-default';
        }
    };

    const getRoleIcon = (name, isSystemRole) => {
        if (isSystemRole) return <MdAdminPanelSettings size={20} />;
        if (name.toLowerCase().includes('manager')) return <MdShield size={20} />;
        if (name.toLowerCase().includes('admin')) return <MdVerifiedUser size={20} />;
        return <MdGroup size={20} />;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatNumber = (num) => {
        return new Intl.NumberFormat().format(num);
    };

    const getPermissionSummary = (permissions) => {
        const moduleCount = permissions.length;
        const totalActions = permissions.reduce((sum, perm) => sum + perm.actions.length, 0);
        return `${moduleCount} modules, ${totalActions} permissions`;
    };

    return (
        <div>
            <div className="page-header">
                <div className="page-title-section">
                    <h1 className="page-title">Role Management</h1>
                    <p className="page-subtitle">Manage user roles and permissions</p>
                </div>
                <div className="page-actions">
                    <Link to="/roles/create" className="btn btn-primary">
                        <MdAdd size={20} />
                        Create Role
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stats-card">
                    <div className="stats-icon total">
                        <MdSecurity size={24} />
                    </div>
                    <div className="stats-content">
                        <h3>{stats.overview?.total || 0}</h3>
                        <p>Total Roles</p>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-icon active">
                        <MdToggleOn size={24} />
                    </div>
                    <div className="stats-content">
                        <h3>{stats.overview?.active || 0}</h3>
                        <p>Active Roles</p>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-icon users">
                        <MdPeople size={24} />
                    </div>
                    <div className="stats-content">
                        <h3>{formatNumber(stats.overview?.totalUsers || 0)}</h3>
                        <p>Total Users</p>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-icon system">
                        <MdAdminPanelSettings size={24} />
                    </div>
                    <div className="stats-content">
                        <h3>{stats.overview?.systemRoles || 0}</h3>
                        <p>System Roles</p>
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
                            placeholder="Search roles..."
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
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                {loading ? (
                    <div className="content-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <p>Loading roles...</p>
                    </div>
                ) : (
                    <>
                        <div className="data-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Role</th>
                                        <th>Permissions</th>
                                        <th>Users</th>
                                        <th>Status</th>
                                        <th>Created</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.map((role) => (
                                        <tr key={role._id}>
                                            <td>
                                                <div className="role-info">
                                                    <div className="role-icon">
                                                        {getRoleIcon(role.name, role.isSystemRole)}
                                                    </div>
                                                    <div className="role-details">
                                                        <div className="role-name">
                                                            {role.name}
                                                            {role.isSystemRole && (
                                                                <span className="system-badge">System</span>
                                                            )}
                                                        </div>
                                                        <p className="role-description">{role.description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="permissions-summary">
                                                    <div className="permission-count">
                                                        {getPermissionSummary(role.permissions)}
                                                    </div>
                                                    <div className="permission-modules">
                                                        {role.permissions.slice(0, 3).map((perm, index) => (
                                                            <span key={index} className="module-tag">
                                                                {perm.module}
                                                            </span>
                                                        ))}
                                                        {role.permissions.length > 3 && (
                                                            <span className="module-tag more">
                                                                +{role.permissions.length - 3} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="user-count">
                                                    <MdPeople size={16} className="user-icon" />
                                                    <span>{role.userCount} users</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`status-badge ${getStatusColor(role.status)}`}>
                                                    {role.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="created-info">
                                                    <div className="created-date">{formatDate(role.createdAt)}</div>
                                                    <div className="created-by">by {role.createdBy}</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <Link
                                                        to={`/roles/${role._id}/edit`}
                                                        className="action-btn edit"
                                                        title="Edit Role"
                                                    >
                                                        <MdEdit size={16} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(role._id, role.isSystemRole)}
                                                        className="action-btn delete"
                                                        title={role.isSystemRole ? 'Cannot delete system role' : 'Delete Role'}
                                                        disabled={role.isSystemRole}
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
                        {pagination?.total > 1 && (
                            <div className="pagination">
                                <button
                                    className="btn btn-sm"
                                    disabled={pagination.current === 1}
                                    onClick={() => handleFilterChange('page', pagination.current - 1)}
                                >
                                    Previous
                                </button>

                                <span className="pagination-info">
                                    Page {pagination.current} of {pagination.total}
                                </span>

                                <button
                                    className="btn btn-sm"
                                    disabled={pagination.current === pagination.total}
                                    onClick={() => handleFilterChange('page', pagination.current + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <style>{`
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .stats-card {
                    background: white;
                    border-radius: 12px;
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    border: 1px solid #f0f0f0;
                }

                .stats-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    flex-shrink: 0;
                }

                .stats-icon.total { background-color: #74b9ff; }
                .stats-icon.active { background-color: #00b894; }
                .stats-icon.users { background-color: #ffc007; }
                .stats-icon.system { background-color: #e17055; }

                .stats-content h3 {
                    font-size: 24px;
                    font-weight: 700;
                    color: #333;
                    margin: 0 0 4px 0;
                }

                .stats-content p {
                    color: #666;
                    font-size: 14px;
                    margin: 0;
                }

                .role-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .role-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 8px;
                    background: #f8f9fa;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #ffc007;
                    flex-shrink: 0;
                }

                .role-details {
                    flex: 1;
                }

                .role-name {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 500;
                    color: #333;
                    margin-bottom: 4px;
                }

                .system-badge {
                    background: #e17055;
                    color: white;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-size: 10px;
                    font-weight: 600;
                    text-transform: uppercase;
                }

                .role-description {
                    font-size: 12px;
                    color: #666;
                    margin: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    max-width: 200px;
                }

                .permissions-summary {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .permission-count {
                    font-size: 12px;
                    color: #666;
                    font-weight: 500;
                }

                .permission-modules {
                    display: flex;
                    gap: 4px;
                    flex-wrap: wrap;
                }

                .module-tag {
                    background: #f8f9fa;
                    color: #333;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-size: 10px;
                    font-weight: 500;
                    border: 1px solid #e9ecef;
                }

                .module-tag.more {
                    background: #ffc007;
                    color: #333;
                    border-color: #ffc007;
                }

                .user-count {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 14px;
                    color: #666;
                }

                .user-icon {
                    color: #74b9ff;
                }

                .created-info {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .created-date {
                    font-size: 14px;
                    color: #333;
                }

                .created-by {
                    font-size: 12px;
                    color: #666;
                }

                .status-success { background-color: #d4edda; color: #155724; }
                .status-secondary { background-color: #e2e3e5; color: #383d41; }

                .action-buttons {
                    display: flex;
                    gap: 4px;
                }

                .filters-section {
                    display: flex;
                    gap: 20px;
                    margin-bottom: 20px;
                    align-items: center;
                    flex-wrap: wrap;
                }

                .search-box {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: white;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    padding: 8px 12px;
                    min-width: 300px;
                }

                .search-box input {
                    border: none;
                    outline: none;
                    flex: 1;
                    font-size: 14px;
                }

                .filter-group {
                    display: flex;
                    gap: 12px;
                }

                .filter-group select {
                    padding: 8px 12px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    background: white;
                    font-size: 14px;
                    min-width: 150px;
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
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 15px;
                    }

                    .filters-section {
                        flex-direction: column;
                        align-items: stretch;
                        gap: 12px;
                    }

                    .search-box {
                        min-width: auto;
                    }

                    .filter-group {
                        flex-direction: column;
                    }

                    .role-description {
                        max-width: 120px;
                    }
                }

                @media (max-width: 480px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }

                    .action-buttons {
                        flex-direction: column;
                        gap: 2px;
                    }
                }
            `}</style>
        </div>
    );
}

export default RoleList;

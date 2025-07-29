import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  MdDashboard,
  MdShoppingBag,
  MdCategory,
  MdShoppingCart,
  MdReceipt,
  MdSettings,
  MdPerson,
  MdPersonPin,
  MdGroup,
  MdSecurity,
  MdMenu,
  MdClose,
  MdNotificationAdd,
  MdReceiptLong
} from 'react-icons/md'

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  // const toggleDropdown = (key) => {
  //   setExpandedDropdowns(prev => {
  //     const newState = {}
  //     Object.keys(prev).forEach(k => {
  //       newState[k] = false
  //     })
  //     newState[key] = !prev[key]
  //     return newState
  //   })
  // }

  const isActive = (path) => location.pathname === path
  // const isDropdownActive = (paths) => paths.some(path => location.pathname.includes(path))

  return (
    <div
      className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'} ${isMobileMenuOpen ? 'mobile-open' : ''}`}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <span><img className="logo-image" src="https://dapper-maamoul-8bc20d.netlify.app/image/Mittronix-logo-black.png" alt="Logo" /></span>
          </div>
          <span className="logo-text">Mittronix</span>
        </div>
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>
      
      <div className="sidebar-section">
        <div className="section-title">General</div>
        
        {/* Dashboard */}
        <Link 
          to="/dashboard" 
          className={`nav-item ${isActive('/dashboard') || isActive('/') ? 'active' : ''}`}
        >
          <span className="nav-icon">
            <MdDashboard size={20} />
          </span>
          <span className="nav-text">Dashboard</span>
        </Link>

        {/* Products */}
          <Link 
          to="/products/list" 
          className={`nav-item ${isActive('/products/list') || isActive('/') ? 'active' : ''}`}
        >
          <span className="nav-icon">
              <MdShoppingBag size={20} />
            </span>
          <span className='nav-text'>Products</span>
        </Link>
          
        {/* Categories */}
          <Link 
          to="/categories/list" 
          className={`nav-item ${isActive('/categories/list') || isActive('/') ? 'active' : ''}`}
        >
          <span className="nav-icon">
              <MdCategory size={20} />
            </span>
          <span className='nav-text'>Categories</span>
        </Link>

        {/* Orders */}
          <Link
          to="/orders/list"
          className={`nav-item ${isActive('/orders/list') || isActive('/') ? 'active' : ''}`}
        >
          <span className="nav-icon">
              <MdReceiptLong size={20} />
            </span>
          <span className='nav-text'>Orders</span>
        </Link>

        {/* Invoices */}
          <Link 
          to="/invoices/list" 
          className={`nav-item ${isActive('/invoices/list') || isActive('/') ? 'active' : ''}`}
        >
          <span className="nav-icon">
              <MdReceipt size={20} />
            </span>
          <span className='nav-text'>Invoices</span>
        </Link>

        {/* Settings */}
        <Link 
          to="/settings" 
          className={`nav-item ${isActive('/settings') ? 'active' : ''}`}
        >
          <span className="nav-icon">
            <MdSettings size={20} />
          </span>
          <span className="nav-text">Settings</span>
        </Link>

      {/* Notifications */}
      <Link 
          to="/notifications" 
          className={`nav-item ${isActive('/notifications') || isActive('/') ? 'active' : ''}`}
        >
          <span className="nav-icon">
            <MdNotificationAdd size={20} />
          </span>
          <span className="nav-text">Notifications</span>
        </Link>
      <Link 
          to="/profile" 
          className={`nav-item ${isActive('/profile') || isActive('/') ? 'active' : ''}`}
        >
          <span className="nav-icon">
            <MdPerson size={20} />
          </span>
          <span className="nav-text">Profile</span>
        </Link>
      </div>

        {/* <div className="sidebar-section">
        <div className="section-title">Users</div>

        
        <Link 
          to="/profile" 
          className={`nav-item ${isActive('/profile') ? 'active' : ''}`}
        >
          <span className="nav-icon">
            <MdPersonPin size={20} />
          </span>
          <span className="nav-text">Profile</span>
        </Link>

        <Link 
          to="/roles" 
          className={`nav-item ${isActive('/roles') ? 'active' : ''}`}
        >
          <span className="nav-icon">
            <MdPerson size={20} />
          </span>
          <span className="nav-text">Roles</span>
        </Link>

        <Link 
          to="/permissions" 
          className={`nav-item ${isActive('/permissions') ? 'active' : ''}`}
        >
          <span className="nav-icon">
            <MdSecurity size={20} />
          </span>
          <span className="nav-text">Permissions</span>
        </Link>

        <Link 
          to="/customers" 
          className={`nav-item ${isActive('/customers') ? 'active' : ''}`}
        >
          <span className="nav-icon">
            <MdGroup size={20} />
          </span>
          <span className="nav-text">Customers</span>
        </Link>

        <Link 
          to="/sellers" 
          className={`nav-item ${isActive('/sellers') ? 'active' : ''}`}
        >
          <span className="nav-icon">
            <MdGroup size={20} />
          </span>
          <span className="nav-text">Sellers</span>
        </Link>
      </div> */}
    </div>
  )
}

export default Sidebar

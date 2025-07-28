import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import ProductList from './pages/ProductList'
import ProductGrid from './pages/ProductGrid'
import ProductDetails from './pages/ProductDetails'
import ProductEdit from './pages/ProductEdit'
import CreateProduct from './pages/CreateProduct'
import CategoriesList from './pages/CategoriesList'
import CreateCategory from './pages/CreateCategory'
import EditCategory from './pages/EditCategory'
import OrdersList from './pages/OrdersList'
import OrderDetails from './pages/OrderDetails'
import OrderAdd from './pages/OrderAdd'
import OrderEdit from './pages/OrderEdit'
import InvoicesList from './pages/InvoicesList'
import InvoiceDetails from './pages/InvoiceDetails'
import InvoiceAdd from './pages/InvoiceAdd'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Products Routes */}
            <Route path="/products/list" element={<ProductList />} />
            <Route path="/products/grid" element={<ProductGrid />} />
            <Route path="/products/details/:id" element={<ProductDetails />} />
            <Route path="/products/edit/:id" element={<ProductEdit />} />
            <Route path="/products/edit" element={<ProductEdit />} />
            <Route path="/products/create" element={<CreateProduct />} />
            
            {/* Categories Routes */}
            <Route path="/categories/list" element={<CategoriesList />} />
            <Route path="/categories/create" element={<CreateCategory />} />
            <Route path="/categories/edit/:id" element={<EditCategory />} />
            <Route path="/categories/edit" element={<EditCategory />} />
            
            {/* Orders Routes */}
            <Route path="/orders/list" element={<OrdersList />} />
            <Route path="/orders/details/:id" element={<OrderDetails />} />
            <Route path="/orders/details" element={<OrderDetails />} />
            <Route path="/orders/add" element={<OrderAdd />} />
            <Route path="/orders/edit/:id" element={<OrderEdit />} />
            <Route path="/orders" element={<OrdersList />} />
            
            {/* Invoices Routes */}
            <Route path="/invoices/list" element={<InvoicesList />} />
            <Route path="/invoices/details/:id" element={<InvoiceDetails />} />
            <Route path="/invoices/details" element={<InvoiceDetails />} />
            <Route path="/invoices/add" element={<InvoiceAdd />} />
            <Route path="/invoices/edit/:id" element={<InvoiceAdd />} />
            <Route path="/invoices" element={<InvoicesList />} />
            
            {/* Settings & Profile & Notifications */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            
            {/* Placeholder routes for other nav items */}
            <Route path="/roles" element={<div className="page-header"><h1>Roles Page</h1></div>} />
            <Route path="/permissions" element={<div className="page-header"><h1>Permissions Page</h1></div>} />
            <Route path="/customers" element={<div className="page-header"><h1>Customers Page</h1></div>} />
            <Route path="/sellers" element={<div className="page-header"><h1>Sellers Page</h1></div>} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

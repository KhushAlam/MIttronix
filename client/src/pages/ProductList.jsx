import { Link } from 'react-router-dom'
import { MdAdd, MdViewModule, MdVisibility, MdEdit, MdDelete } from 'react-icons/md'

function ProductList() {
  const products = [
    // Televisions
    {
      id: 1,
      name: 'LG OLED evo C4 65"',
      category: 'Televisions',
      price: '₹2,10,000',
      stock: 18,
      status: 'Active',
      image: 'https://media.us.lg.com/transform/ecomm-PDPGallery-1100x730/e6447925-25cd-492e-8904-1569ea52e517/TV_OLED65C4PUA_gallery-01_3000x3000?io=transform:fill,width:596'
    },
    {
      id: 2,
      name: 'Samsung S95D QD-OLED 77"',
      category: 'Televisions',
      price: '₹3,25,000',
      stock: 9,
      status: 'Active',
      image: 'https://images.samsung.com/is/image/samsung/p6pim/in/qa77s95daulxl/gallery/in-oled-s95d-qa77s95daulxl-540952127?$684_547_PNG$'
    },
    {
      id: 3,
      name: 'Sony Bravia 9 Mini-LED TV',
      category: 'Televisions',
      price: '₹2,65,500',
      stock: 11,
      status: 'Active',
      image: 'https://www.sathya.store/img/product/bq03UOEqxtv6VFAS.png'
    },
    // Air Conditioners
    {
      id: 5,
      name: 'Daikin FTKM Series 1.5 Ton',
      category: 'Air Conditioners',
      price: '₹45,500',
      stock: 35,
      status: 'Active',
      image: 'https://5.imimg.com/data5/SELLER/Default/2022/1/TH/DF/QN/43332590/daikin-non-inverter-split-ac-500x500.jpg'
    },
    {
      id: 6,
      name: 'LG AI DualCool 2.0 Ton',
      category: 'Air Conditioners',
      price: '₹56,990',
      stock: 22,
      status: 'Active',
      image: 'https://www.lg.com/ae/images/split-air-conditioners/md06220157/gallery/N01_D-01.jpg'
    },
    {
      id: 7,
      name: 'Voltas Vectra 1.8 Ton Split AC',
      category: 'Air Conditioners',
      price: '₹42,000',
      stock: 0,
      status: 'Out of Stock',
      image: 'https://m.media-amazon.com/images/I/41e6oqY5-ZL._UF1000,1000_QL80_.jpg'
    },
    // Refrigerators
    {
      id: 9,
      name: 'Samsung Bespoke AI Family Hub',
      category: 'Refrigerators',
      price: '₹2,29,000',
      stock: 12,
      status: 'Active',
      image: 'https://image-us.samsung.com/SamsungUS/home/home-appliances/refrigerators/5252023/2RF29DB9900QRF23DB9900QD.jpg?$product-details-jpg$'
    },
    {
      id: 10,
      name: 'LG InstaView Side-by-Side',
      category: 'Refrigerators',
      price: '₹1,85,500',
      stock: 15,
      status: 'Active',
      image: 'https://www.lg.com/content/dam/channel/wcms/in/images/refrigerators/updated4/GL-X257AMC3-350X350.jpg'
    },
    {
      id: 11,
      name: 'Haier 3-Door Convertible Fridge',
      category: 'Refrigerators',
      price: '₹89,990',
      stock: 20,
      status: 'Active',
      image: 'https://vsprod.vijaysales.com/media/catalog/product/2/3/235770_1_.jpg?optimize=medium&fit=bounds&height=500&width=500'
    },
    // Washing Machines
    {
      id: 13,
      name: 'Bosch Serie 8 Front Load',
      category: 'Washing Machines',
      price: '₹52,990',
      stock: 14,
      status: 'Active',
      image: 'https://m.media-amazon.com/images/I/41zwBeLedAL._UF1000,1000_QL80_.jpg'
    },
    {
      id: 14,
      name: 'LG AI DD 10kg Front Load',
      category: 'Washing Machines',
      price: '₹48,990',
      stock: 19,
      status: 'Active',
      image: 'https://www.lg.com/content/dam/channel/wcms/in/images/washing-machines/fhp1410z7p_apsqeil_eail_in_c/gallery/FHP1410Z7P-Washing-Machines-Front-View-D-01.jpg'
    },
    {
      id: 15,
      name: 'Samsung Ecobubble 12kg Top Load',
      category: 'Washing Machines',
      price: '₹35,000',
      stock: 30,
      status: 'Active',
      image: 'https://paibackend.bangalore2.com/media/images/1_qDXgxvy.jpg'
    },
    // Microwaves
    {
      id: 17,
      name: 'Samsung Convection with SmartThings',
      category: 'Microwaves',
      price: '₹16,490',
      stock: 50,
      status: 'Active',
      image: 'https://images.samsung.com/is/image/samsung/p6pim/in/mc32b7382qc-tl/gallery/in-mw7300b-mc32b7388le-mc32b7382qc-tl-533791294?$684_547_PNG$'
    },
    {
      id: 18,
      name: 'LG Charcoal Healthy Ovens',
      category: 'Microwaves',
      price: '₹18,990',
      stock: 28,
      status: 'Active',
      image: 'https://www.lg.com/content/dam/channel/wcms/in/images/microwave-ovens/mj2887bfum_dbkqiln_eail_in_c/gallery/MJ2887BFUM-DZ-02.jpg'
    },
    {
      id: 19,
      name: 'Panasonic 7-in-1 Convection Oven',
      category: 'Microwaves',
      price: '₹21,000',
      stock: 21,
      status: 'Active',
      image: 'https://store.in.panasonic.com/media/catalog/product/cache/40b589206cef99ab7dca1586fe425968/a/r/artboard-2_76.webp'
    }
]

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      console.log('Deleting product:', productId)
      // Add delete logic here
    }
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Product List</h1>
          <p className="page-subtitle">Manage your products inventory</p>
        </div>
        <div className="page-actions">
          <Link to="/products/create" className="btn btn-primary">
            <MdAdd size={16} />
            Add Product
          </Link>
          <Link to="/products/grid" className="btn btn-secondary">
            <MdViewModule size={16} />
            Grid View
          </Link>
        </div>
      </div>

      <div className="content-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="product-info">
                      <img src={product.image} alt={product.name} className="product-image" />
                      <span className="product-name">{product.name}</span>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td className="price">{product.price}</td>
                  <td>
                    <span className={`stock ${product.stock === 0 ? 'out-of-stock' : 'in-stock'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td>
                    <span className={`status ${product.status === 'Active' ? 'active' : 'inactive'}`}>
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link 
                        to={`/products/details/${product.id}`} 
                        className="action-btn view"
                        title="View Details"
                      >
                        <MdVisibility size={16} />
                      </Link>
                      <Link 
                        to={`/products/edit/${product.id}`} 
                        className="action-btn edit"
                        title="Edit Product"
                      >
                        <MdEdit size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="action-btn delete"
                        title="Delete Product"
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
      </div>
    </div>
  )
}

export default ProductList

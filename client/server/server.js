const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const mockOrders = [
  {
    _id: 'ord-001',
    customerName: 'John Doe',
    customerId: 'CUST001',
    orderStatus: 'Completed',
    totalAmount: 2500,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'ord-002',
    customerName: 'Jane Smith',
    customerId: 'CUST002',
    orderStatus: 'Delivered',
    totalAmount: 1800,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'ord-003',
    customerName: 'Bob Johnson',
    customerId: 'CUST003',
    orderStatus: 'Processing',
    totalAmount: 3200,
    createdAt: new Date().toISOString()
  }
];

const mockProducts = [
  {
    _id: 'prod-001',
    name: 'Samsung 65" QLED 4K Smart TV',
    description: 'Premium 65-inch QLED 4K Smart TV with HDR10+ technology, built-in Alexa support, and stunning picture quality for ultimate entertainment experience.',
    category: 'cat-001',
    sku: 'SAM-TV-65Q90-2024',
    price: 89999,
    mrp: 119999,
    discountPrice: 89999,
    colour: 'Titan Gray',
    size: '65 inches',
    variants: ['55 inches', '65 inches', '75 inches'],
    specification: '65" QLED 4K Display, HDR10+, Smart TV, Built-in Alexa, 3 HDMI ports, WiFi enabled, Voice Control',
    stockQuantity: 12,
    stockStatus: 'InStock',
    brand: 'Samsung',
    weight: '28.5 kg',
    dimensions: '145.1 x 83.3 x 9.9 cm',
    tags: ['smart tv', '4k', 'qled', 'samsung', 'entertainment', 'alexa'],
    warranty: '2 years comprehensive warranty + 10 years panel warranty',
    returnPolicy: '30 days return policy. Product must be in original condition.',
    barcode: '8801643569148',
    supplier: {
      name: 'Samsung India Electronics',
      contact: '+91-1800-123-456',
      email: 'supplier@samsung.com'
    },
    hsnCode: '85285200',
    shipping: {
      charges: 'Free delivery',
      deliveryTime: '2-5 business days',
      restrictions: 'No cash on delivery for this item'
    },
    isActive: true,
    status: 'Active',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
        alt: 'Samsung 65 inch QLED 4K Smart TV'
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'prod-002',
    name: 'LG 7kg Front Load Washing Machine',
    description: 'Energy-efficient 7kg front load washing machine with AI DD technology and steam wash for better fabric care and superior cleaning performance.',
    category: 'cat-002',
    sku: 'LG-WM-7KG-FHM1207ZDL',
    price: 42999,
    mrp: 54999,
    discountPrice: 42999,
    colour: 'White',
    size: '7 kg',
    variants: ['6 kg', '7 kg', '8 kg'],
    specification: '7kg Capacity, Front Load, AI DD Technology, Steam Wash, 1400 RPM, Energy Star 5 Rated, 14 wash programs',
    stockQuantity: 8,
    stockStatus: 'InStock',
    brand: 'LG',
    weight: '65 kg',
    dimensions: '60 x 56 x 85 cm',
    tags: ['washing machine', 'front load', 'lg', 'ai technology', 'steam wash', 'energy efficient'],
    warranty: '2 years comprehensive warranty + 10 years motor warranty',
    returnPolicy: '7 days return policy. Installation required before return.',
    barcode: '8801084594628',
    supplier: {
      name: 'LG Electronics India',
      contact: '+91-1800-180-9999',
      email: 'supplier@lge.com'
    },
    hsnCode: '84501200',
    shipping: {
      charges: 'Free delivery + installation',
      deliveryTime: '3-7 business days',
      restrictions: 'Installation included. Old appliance exchange available'
    },
    isActive: true,
    status: 'Active',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=400&fit=crop',
        alt: 'LG 7kg Front Load Washing Machine'
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'prod-003',
    name: 'Whirlpool 265L Double Door Refrigerator',
    description: 'Spacious 265L double door refrigerator with advanced cooling technology, frost-free operation, and energy efficiency for modern families.',
    category: 'cat-003',
    sku: 'WP-REF-265DD-ARCTIC',
    price: 28999,
    mrp: 34999,
    discountPrice: 28999,
    colour: 'Arctic Steel',
    size: '265 Liters',
    variants: ['235L', '265L', '295L'],
    specification: '265L Capacity, Double Door, Frost Free, 5 Star Energy Rating, Advanced Cooling Technology, Vegetable Crisper',
    stockQuantity: 15,
    stockStatus: 'InStock',
    brand: 'Whirlpool',
    weight: '55 kg',
    dimensions: '60 x 66.5 x 154 cm',
    tags: ['refrigerator', 'double door', 'whirlpool', 'frost free', 'energy efficient', '5 star'],
    warranty: '1 year comprehensive warranty + 10 years compressor warranty',
    returnPolicy: '10 days return policy. Product must be unused and in original packaging.',
    barcode: '8901499631712',
    supplier: {
      name: 'Whirlpool of India Ltd',
      contact: '+91-1800-208-1800',
      email: 'supplier@whirlpool.com'
    },
    hsnCode: '84183000',
    shipping: {
      charges: 'Free delivery',
      deliveryTime: '2-6 business days',
      restrictions: 'Installation charges extra. Old appliance exchange available'
    },
    isActive: true,
    status: 'Active',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop',
        alt: 'Whirlpool 265L Double Door Refrigerator'
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Health check
app.get('/api/', (req, res) => {
  res.json({ status: 'OK', message: 'Mock API Server Running' });
});

// Orders endpoints
app.get('/api/orders', (req, res) => {
  res.json(mockOrders);
});

app.get('/api/orders/this-month', (req, res) => {
  res.json({
    count: mockOrders.length,
    data: mockOrders
  });
});

app.get('/api/orders/last-month', (req, res) => {
  res.json({
    count: 2,
    data: mockOrders.slice(0, 2)
  });
});

app.get('/api/orders/this-year', (req, res) => {
  res.json({
    count: mockOrders.length,
    data: mockOrders
  });
});

app.get('/api/orders/by-month', (req, res) => {
  const { year, month } = req.query;
  res.json({
    count: mockOrders.length,
    data: mockOrders,
    year,
    month
  });
});

// Products endpoints
app.get('/api/products', (req, res) => {
  // Ensure all products have _id field (convert id to _id if needed)
  const productsWithId = mockProducts.map(product => ({
    ...product,
    _id: product._id || product.id || `prod-${Date.now()}-${Math.random()}`
  }));
  res.json(productsWithId);
});

app.get('/api/products/:id', (req, res) => {
  const product = mockProducts.find(p => p._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

const mockCategories = [
  {
    _id: 'cat-001',
    title: 'Television & Entertainment',
    description: 'LED TVs, Smart TVs, and entertainment systems',
    slug: 'television-entertainment',
    isActive: true,
    parent: null,
    isSubCategory: false,
    productCount: 12,
    status: 'Active',
    createdAt: '2024-01-01T00:00:00Z',
    createdBy: 'Admin'
  },
  {
    _id: 'cat-002',
    title: 'Home Appliances',
    description: 'Washing machines, refrigerators, and other appliances',
    slug: 'home-appliances',
    isActive: true,
    parent: null,
    isSubCategory: false,
    productCount: 18,
    status: 'Active',
    createdAt: '2024-01-02T00:00:00Z',
    createdBy: 'Admin'
  },
  {
    _id: 'cat-003',
    title: 'Kitchen Appliances',
    description: 'Microwaves, ovens, and kitchen equipment',
    slug: 'kitchen-appliances',
    isActive: true,
    parent: 'cat-002',
    isSubCategory: true,
    productCount: 8,
    status: 'Active',
    createdAt: '2024-01-03T00:00:00Z',
    createdBy: 'Admin'
  },
  {
    _id: 'cat-004',
    title: 'Cooling Appliances',
    description: 'Refrigerators, air conditioners, and cooling systems',
    slug: 'cooling-appliances',
    isActive: true,
    parent: 'cat-002',
    isSubCategory: true,
    productCount: 6,
    status: 'Active',
    createdAt: '2024-01-04T00:00:00Z',
    createdBy: 'Admin'
  },
  {
    _id: 'cat-005',
    title: 'Accessories',
    description: 'Phone cases, chargers, and other accessories',
    slug: 'accessories',
    isActive: true,
    parent: null,
    isSubCategory: false,
    productCount: 25,
    status: 'Active',
    createdAt: '2024-01-05T00:00:00Z',
    createdBy: 'Admin'
  }
];

// Categories endpoints
app.get('/api/category', (req, res) => {
  res.json(mockCategories);
});

app.get('/api/category/parent', (req, res) => {
  const parentCategories = mockCategories.filter(cat => !cat.isSubCategory);
  res.json(parentCategories);
});

app.get('/api/category/:id', (req, res) => {
  const category = mockCategories.find(cat => cat._id === req.params.id);
  if (category) {
    res.json(category);
  } else {
    res.status(404).json({ error: 'Category not found' });
  }
});

app.post('/api/category', (req, res) => {
  const newCategory = {
    _id: `cat-${String(mockCategories.length + 1).padStart(3, '0')}`,
    ...req.body,
    isActive: true,
    status: 'Active',
    createdAt: new Date().toISOString(),
    createdBy: 'Admin'
  };
  mockCategories.push(newCategory);
  res.status(201).json(newCategory);
});

app.put('/api/category/:id', (req, res) => {
  const categoryIndex = mockCategories.findIndex(cat => cat._id === req.params.id);
  if (categoryIndex !== -1) {
    mockCategories[categoryIndex] = {
      ...mockCategories[categoryIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    res.json(mockCategories[categoryIndex]);
  } else {
    res.status(404).json({ error: 'Category not found' });
  }
});

app.delete('/api/category/:id', (req, res) => {
  const categoryIndex = mockCategories.findIndex(cat => cat._id === req.params.id);
  if (categoryIndex !== -1) {
    const deletedCategory = mockCategories.splice(categoryIndex, 1)[0];
    res.json({ message: 'Category deleted successfully', category: deletedCategory });
  } else {
    res.status(404).json({ error: 'Category not found' });
  }
});

// Create order endpoint
app.post('/api/orders', (req, res) => {
  const newOrder = {
    _id: `ord-${String(mockOrders.length + 1).padStart(3, '0')}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  mockOrders.push(newOrder);
  res.status(201).json(newOrder);
});

// Create product endpoint
app.post('/api/products', (req, res) => {
  const newProduct = {
    _id: `prod-${String(mockProducts.length + 1).padStart(3, '0')}`,
    ...req.body,
    stockStatus: 'InStock',
    isActive: true,
    createdAt: new Date().toISOString()
  };
  mockProducts.push(newProduct);
  res.status(201).json(newProduct);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- GET /api/ (health check)');
  console.log('- GET /api/orders');
  console.log('- GET /api/orders/this-month');
  console.log('- GET /api/orders/last-month');
  console.log('- GET /api/orders/this-year');
  console.log('- GET /api/orders/by-month');
  console.log('- POST /api/orders');
  console.log('- GET /api/products');
  console.log('- GET /api/products/:id');
  console.log('- POST /api/products');
  console.log('- GET /api/category');
  console.log('- GET /api/category/parent');
  console.log('- GET /api/category/:id');
  console.log('- POST /api/category');
  console.log('- PUT /api/category/:id');
  console.log('- DELETE /api/category/:id');
});

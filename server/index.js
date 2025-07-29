import express from 'express';
import dotenv from 'dotenv';
import connectDb from "./db/connectDB.js";
import productRoutes from './routes/product.route.js';
import categoryRoutes from './routes/category.route.js'
import seedRoutes from './routes/seed.route.js';
import testRoutes from './routes/test.route.js';
import cors from "cors"
import orderRoutes from './routes/order.route.js';
import userRoutes from './routes/user.route.js';

const app = express();
app.use(express.json())

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

dotenv.config();
const PORT = process.env.PORT;


connectDb();

app.use('/api/test', testRoutes);
app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/seed', seedRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, ()=> {
    console.log(`server is running on ${PORT}`);
})

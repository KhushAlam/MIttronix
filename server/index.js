import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connectDB.js";
import productRoutes from "./routes/product.route.js";
import categoryRoutes from "./routes/category.route.js";
import cors from "cors";
import orderRoutes from "./routes/order.route.js";
import authRoutes from "./routes/auth.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import invoiceRoutes from "./routes/invoice.routes.js";
import serviceRequestRoutes from "./routes/serviceRequest.routes.js";
import bannerRoutes from './routes/banner.routes.js'
import blogRoutes from './routes/blog.routes.js'
import roleRoutes from './routes/roles.routes.js'

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

dotenv.config();

const PORT = process.env.PORT;

connectDb();

app.use("/api/products", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/service-requests", serviceRequestRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/roles", roleRoutes);


app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

import express from "express";
import {
  getOrders,
  getOrdersByMonth,
  editOrderById,
  getOrdersLastMonth,
  getOrdersThisYear,
  getOrdersThisMonth,
} from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/by-month", getOrdersByMonth);
router.put("/:id", editOrderById);
router.get("/orders/this-month", getOrdersThisMonth);
router.get("/orders/last-month", getOrdersLastMonth);
router.get("/orders/this-year", getOrdersThisYear);

export default router;

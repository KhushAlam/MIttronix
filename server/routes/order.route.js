import express from 'express';
import { getOrders, getOrdersByMonth } from '../controllers/order.controller.js';

const router = express.Router();

router.get('/', getOrders);
router.get('/by-month', getOrdersByMonth);

export default router;

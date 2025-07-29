import express from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/product.controller.js'
import upload from '../middlewares/multer.js';

const router = express.Router()

router.post('/', upload.array('productImages', 6), createProduct);
router.get('/', getProducts);
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

export default router;

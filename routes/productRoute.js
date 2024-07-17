import express from 'express';
import formidable from 'express-formidable';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
import {
    createProductController,
    getProductsController,
    getProductController,
    updateProductController,
    searchProductController,
    relatedProductController,
    productCategoryController,
    searchProductIDController,
} from '../controllers/productController.js';

const router = express.Router();

// Create product
router.post('/product', requireSignIn, isAdmin, formidable(), createProductController);

// Get all products
router.get('/products', getProductsController);

// Get product by slug
router.get('/product/slug/:slug', getProductController);

// Update product
router.put('/product/:id', requireSignIn, isAdmin, formidable(), updateProductController);

// Search product by keyword
router.get('/product/search/:keyword', searchProductController);

// Search product by ID
router.get('/product/id/:id', requireSignIn, isAdmin, searchProductIDController);

// Get related products
router.get('/product/related/:pid/:cid', relatedProductController);

// Get products by category
router.get('/product/category/:slug', productCategoryController);

export default router;

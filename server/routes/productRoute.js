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
    getPhotourlController,
    deleteProductController,
    productFiltersController,
    productCountController,
    productListController,
    braintreeTokenController,
    brainTreePaymentController,
    getBestsellerProducts,
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

//Get URL of photo by id
router.get('/photoURL/:id', getPhotourlController);

//delete product
router.delete("/delete-product/:id", deleteProductController);

//filter product
router.post('/product-filters', productFiltersController);

//product count
router.get('/product-count', productCountController);

//product per page
router.get('/product-list/:page', productListController);

//bestseller
router.get('/bestseller', getBestsellerProducts);

//payments routes
//token
router.get('/braintree/token', braintreeTokenController);

//payments
router.post('/braintree/payment', requireSignIn, brainTreePaymentController);



export default router;

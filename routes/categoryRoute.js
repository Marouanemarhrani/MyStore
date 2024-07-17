import express from 'express';
import formidable from 'express-formidable';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
import {
    createCategoryController,
    updateCategoryController,
    getCategoriesController,
    getCategoryController,
    searchCategoryIDController,
} from '../controllers/categoryController.js';

const router = express.Router();

// Create category
router.post('/category', requireSignIn, isAdmin, formidable(), createCategoryController);

// Update category
router.put('/category/:id', requireSignIn, isAdmin, formidable(), updateCategoryController);

// Get all categories
router.get('/categories', getCategoriesController);

// Get category by slug
router.get('/category/slug/:slug', getCategoryController);

// Search category by ID
router.get('/category/id/:id', requireSignIn, isAdmin, searchCategoryIDController);

export default router;

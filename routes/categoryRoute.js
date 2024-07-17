import express from 'express';
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
    createCategoryController,
    updateCategoryController,
    getCategoriesController,
    getCategoryController,
    searchCategoryIDController,
} from '../controllers/categoryController.js';
import formidable from "express-formidable";

const router = express.Router();

// Create category
router.post('/create-category', requireSignIn, isAdmin, formidable(), createCategoryController);

// Update category
router.put('/update-category/:id', requireSignIn, isAdmin, formidable(), updateCategoryController);

// Get all categories
router.get('/categories', getCategoriesController);

// Get category by slug
router.get('/category/:slug', getCategoryController);

// Search category by ID
router.get('/category/:id', requireSignIn, isAdmin, searchCategoryIDController);

export default router;

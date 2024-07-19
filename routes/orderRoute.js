import express from 'express';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
import {
    createOrderController,
    updateOrderController,
    getOrdersController,
    getOrderController,
    deleteOrderController,
} from '../controllers/orderController.js';

const router = express.Router();

// Create an order
router.post('/create-order', requireSignIn, createOrderController);

// Update an order
router.put('/update-order/:id', requireSignIn, isAdmin, updateOrderController);

// Get all orders
router.get('/orders', requireSignIn, isAdmin, getOrdersController);

// Get a specific order by ID
router.get('/order/:id', requireSignIn, isAdmin, getOrderController);

// Delete an order
router.delete('/order/:id', requireSignIn, isAdmin, deleteOrderController);

export default router;

import express from 'express';
import { requireSignIn, isAdmin, isTechnician } from '../middlewares/authMiddleware.js';
import {
    createServiceController,
    updateServiceController,
    getServicesController,
    getServiceController,
    deleteServiceController,
} from '../controllers/serviceController.js';

const router = express.Router();

// Create service
router.post('/create-service', requireSignIn, isAdmin, createServiceController);

// Update service
router.put('/update-service/:id', requireSignIn, isAdmin, updateServiceController);

// Get all services
router.get('/services', requireSignIn, getServicesController);

// Get service by ID
router.get('/service/:id', requireSignIn, getServiceController);

// Delete service
router.delete('/service/:id', requireSignIn, isAdmin, deleteServiceController);

export default router;

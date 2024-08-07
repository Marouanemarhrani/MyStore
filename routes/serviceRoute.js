import express from 'express';
import { requireSignIn, isAdmin, isTechnician } from '../middlewares/authMiddleware.js';
import {
    createServiceController,
    updateServiceController,
    getServicesController,
    deleteServiceController,
    singleServiceController,
} from '../controllers/serviceController.js';

const router = express.Router();

// Create service
router.post('/create-service', requireSignIn, isAdmin, createServiceController);

// Update service
router.put('/update-service/:id', requireSignIn, isAdmin, updateServiceController);

// Get all services
router.get('/services', getServicesController);

// Delete service
router.delete('/delete-service/:id', requireSignIn, isAdmin, deleteServiceController);

//single category
router.get("/single-service/:slug", singleServiceController);

export default router;

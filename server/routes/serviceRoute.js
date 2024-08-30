import express from 'express';
import formidable from 'express-formidable';
import { requireSignIn, isAdmin, isTechnician } from '../middlewares/authMiddleware.js';
import {
    createServiceController,
    updateServiceController,
    getServicesController,
    deleteServiceController,
    singleServiceController,
    getServicePhotourlController,
} from '../controllers/serviceController.js';

const router = express.Router();

// Create service
router.post('/create-service', requireSignIn, isAdmin, formidable(), createServiceController);

// Update service
router.put('/update-service/:id', requireSignIn, isAdmin, formidable(), updateServiceController);

// Get all services
router.get('/services', getServicesController);

// Delete service
router.delete('/delete-service/:id', requireSignIn, isAdmin, deleteServiceController);

//single category
router.get("/single-service/:slug", singleServiceController);

//Get URL of photo by id
router.get('/service/photoURL/:id', getServicePhotourlController);

export default router;

const express = require('express');
const formidable = require('express-formidable');
const { requireSignIn, isAdmin, isTechnician } = require('../middlewares/authMiddleware');
const {
    createServiceController,
    updateServiceController,
    getServicesController,
    deleteServiceController,
    singleServiceController,
    getServicePhotourlController,
} = require('../controllers/serviceController');

const router = express.Router();

// Create service
router.post('/create-service', requireSignIn, isAdmin, formidable(), createServiceController);

// Update service
router.put('/update-service/:id', requireSignIn, isAdmin, formidable(), updateServiceController);

// Get all services
router.get('/services', getServicesController);

// Delete service
router.delete('/delete-service/:id', requireSignIn, isAdmin, deleteServiceController);

// Single service
router.get('/single-service/:slug', singleServiceController);

// Get URL of photo by id
router.get('/service/photoURL/:id', getServicePhotourlController);

module.exports = router;

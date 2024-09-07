const express = require('express');
const { requireSignIn, isAdmin, isTechnician } = require('../middlewares/authMiddleware');
const {
    createAppointmentController,
    updateAppointmentController,
    getAppointmentsController,
    getAppointmentController,
    deleteAppointmentController,
    singleAppointmentController,
} = require('../controllers/appointmentController');

const router = express.Router();

// Create appointment
router.post('/create-appointment', createAppointmentController);

// Update appointment
router.put('/update-appointment/:id', requireSignIn, updateAppointmentController);

// Get all appointments 
router.get('/appointments', requireSignIn, isTechnician, getAppointmentsController);

// Get appointment by ID
router.get('/appointment/:id', requireSignIn, isAdmin, getAppointmentController);

// Delete appointment
router.delete('/appointment/:id', requireSignIn, isTechnician, deleteAppointmentController);

// Single appointments
router.get("/single-appointment/:lastname/:firstname", requireSignIn, isTechnician, singleAppointmentController);

module.exports = router;

import express from 'express';
import { requireSignIn, isAdmin, isTechnician } from '../middlewares/authMiddleware.js';
import {
    createAppointmentController,
    updateAppointmentController,
    getAppointmentsController,
    getAppointmentController,
    deleteAppointmentController,
    singleAppointmentController,
} from '../controllers/appointmentController.js';

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

//single appointments
router.get("/single-appointment/:lastname", requireSignIn, isTechnician, singleAppointmentController);

export default router;

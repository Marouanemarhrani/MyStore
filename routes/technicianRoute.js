import express from "express";
import { registerController, loginController, updateProfileController } from "../controllers/technicianController.js";
import { requireSignIn, isAdmin, isTechnician } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routing
// Register a new user
router.post('/register',requireSignIn, isAdmin, registerController);

// User login
router.post('/login', loginController);

// Update user profile
router.put('/profile', requireSignIn, isTechnician, updateProfileController);

export default router;

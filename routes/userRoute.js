import express from "express";
import { registerController, loginController, updateProfileController } from "../controllers/userController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routing
// Register a new user
router.post('/register', registerController);

// User login
router.post('/login', loginController);

// Update user profile
router.put('/profile', requireSignIn, updateProfileController);

export default router;

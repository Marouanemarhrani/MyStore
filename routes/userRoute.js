import express from "express";
import { registerController, loginController, updateProfileController } from "../controllers/userController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routing
// Register a new user
router.post('/register', registerController);

// User login
router.post('/login', loginController);

// Update user profile
router.put('/profile', requireSignIn, updateProfileController);

//protected user route auth
router.get("/user-auth", requireSignIn, (req,res) => {
    res.status(200).send({ ok: true });
});

//protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req,res) => {
    res.status(200).send({ ok: true });
});

export default router;

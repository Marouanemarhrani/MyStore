import express from "express";
import { registerController, loginController, updateProfileController, getAllOrdersController, orderStatusController, getOrdersController } from "../controllers/userController.js";
import { isAdmin, isTechnician, requireSignIn } from "../middlewares/authMiddleware.js";

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

//protected technician route auth
router.get("/technician-auth", requireSignIn, isTechnician, (req,res) => {
    res.status(200).send({ ok: true });
});

//orders
router.get('/orders', requireSignIn, getOrdersController);

//all orders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController);

//order status update
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController);


export default router;

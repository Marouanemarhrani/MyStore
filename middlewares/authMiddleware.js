import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Routes token-based
export const requireSignIn = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization header is missing or malformed' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(403).json({ message: 'Invalid token' });
    }
};

// Admin access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admins only.",
            });
        }
        next();
    } catch (error) {
        console.error('Admin Middleware Error:', error);
        return res.status(500).json({
            success: false,
            message: "Error in admin middleware",
            error,
        });
    }
};

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
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(403).json({ message: 'Invalid token' });
    }
};

//admin access

export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({
                success: false,
                message: "You can't access to this page!",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            succes: false,
            error,
            message: "Error in admin middleware",
        });
    }
};
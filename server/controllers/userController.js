import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { comparePassword, hashPassword } from './../helpers/authHelper.js';
import JWT from "jsonwebtoken";

// Register a new user
export const registerController = async (req, res) => {
    try {
        const { firstname, lastname, email, password, phone, address } = req.body;
        
        // Validation
        const requiredFields = { firstname, lastname, email, password, phone, address };
        for (const [field, value] of Object.entries(requiredFields)) {
            if (!value) {
                return res.status(400).send({ message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required for authentication!` });
            }
        }

        // Check if user exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "An account is already registered with this email. Login or try another email",
            });
        }

        // Register user
        const hashedPassword = await hashPassword(password);
        const user = new userModel({
            firstname,
            lastname,
            email,
            phone,
            address,
            password: hashedPassword,
        });
        await user.save();

        res.status(201).send({
            success: true,
            message: "Account added successfully",
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "An unexpected error occurred. Please try again.",
            error,
        });
    }
};

// Login user
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Email and password are required',
            });
        }

        // Check user existence
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User doesn't exist. Please register or try another email.",
            });
        }

        // Password comparison
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Incorrect password. Please try again.",
            });
        }

        // Generate token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "An unexpected error occurred during login. Please try again.",
            error,
        });
    }
};

//update profile

export const updateProfileController = async (req, res) => {
    try {
        const {firstname,lastname, email, password, address, phone} = req.body;
        const user = await userModel.findById(req.user._id)
        //password
        if(password && password.length < 6){
            return res.json({error:'Password is required and with 6 character long'});
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            firstname: firstname || user.firstname,
            lastname: lastname || user.lastname,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address ||user.address,
        }, {new:true})
        res.status(200).send({
            success:true,
            message:'Profile updated successfully',
            updatedUser,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"There was an error in updating the profile",
            error,
        });
    }
};

//orders
export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
        .find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error In getting orders",
            error,
        });
    }
};

// All orders
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting all orders",
            error,
        });
    }
};


//order status
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: "Ther was an error while updating the order",
            error,
        });
    }
};

//update address
export const updateAddressController = async (req, res) => {
    try {
        const {address} = req.body;
        const user = await userModel.findById(req.user._id)
        const updatedAddress = await userModel.findByIdAndUpdate(req.user._id, {
            address: address ||user.address,
        }, {new:true})
        res.status(200).send({
            success:true,
            message:'Address updated successfully',
            updatedAddress,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"There was an error in updating the profile",
            error,
        });
    }
}; 
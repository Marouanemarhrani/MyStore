import technicianModel from "../models/technicianModel.js";
import { comparePassword, hashPassword } from './../helpers/authHelper.js';
import JWT from "jsonwebtoken";

// Register a new technician
export const registerController = async (req, res) => {
    try {
        const { firstname, lastname, email, password, phone, skills, availability, address } = req.body;
        
        // Validation
        const requiredFields = { firstname, lastname, email, password, phone, skills, availability, address };
        for (const [field, value] of Object.entries(requiredFields)) {
            if (!value) {
                return res.status(400).send({ message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required for authentication!` });
            }
        }

        // Check if technician exists
        const existingTechnician = await technicianModel.findOne({ email });
        if (existingTechnician) {
            return res.status(200).send({
                success: false,
                message: "An account is already registered with this email. Login or try another email",
            });
        }

        // Register tecchnician
        const hashedPassword = await hashPassword(password);
        const technician = new technicianModel({
            firstname,
            lastname,
            email,
            phone,
            skills, 
            availability,
            address,
            password: hashedPassword,
        });
        await technician.save();

        res.status(201).send({
            success: true,
            message: "Account added successfully",
            technician,
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

// Login technician
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

        // Check technicians existence
        const technician = await technicianModel.findOne({ email });
        if (!technician) {
            return res.status(404).send({
                success: false,
                message: "Technician doesn't exist. Please register or try another email.",
            });
        }

        // Password comparison
        const isMatch = await comparePassword(password, technician.password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Incorrect password. Please try again.",
            });
        }

        // Generate token
        const token = JWT.sign({ _id: technician._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).send({
            success: true,
            message: "Login successful",
            technician: {
                _id: technician._id,
                firstname: technician.firstname,
                lastname: technician.lastname,
                email: technician.email,
                phone: technician.phone,
                skills: technician.skills,
                availability: technician.availability,
                address: technician.address,
                isActive: technician.isActive
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

// Update technician profile
export const updateProfileController = async (req, res) => {
    try {
        const { firstname, lastname, email, password, phone, skills, availability , address } = req.body;
        const technician = await technicianModel.findById(req.user._id);

        // Password validation
        if (password && password.length < 6) {
            return res.status(400).send({ error: 'Password must be at least 6 characters long' });
        }

        // Hash new password if provided
        const hashedPassword = password ? await hashPassword(password) : technician.password;

        // Update technician details
        const updatedTechnician = await technicianModel.findByIdAndUpdate(req.user._id, {
            firstname: firstname || technician.firstname,
            lastname: lastname || technician.lastname,
            email: email || technician.email,
            password: hashedPassword,
            phone: phone || technician.phone,
            skills: skills || technician.skills,
            availability: availability || technician.availability,
            address: address || technician.address,
        }, { new: true });

        res.status(200).send({
            success: true,
            message: 'Profile updated successfully',
            technician: updatedTechnician,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "An unexpected error occurred while updating the profile. Please try again.",
            error,
        });
    }
};

import mongoose from "mongoose";

const technicianSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please use a valid phone number'],
    },
    skills: {
        type: [String], // Array of skills
        required: true,
    },
    availability: {
        type: Map,
        of: Boolean,
        default: {} // A map to track availability (e.g., { Monday: true, Tuesday: false, ... })
    },
    isActive: {
        type: Boolean,
        default: true, // Indicates if the technician is currently active
    },
    address: {
        type: String,
        trim: true,
    },
}, { timestamps: true });

export default mongoose.model('Technician', technicianSchema);

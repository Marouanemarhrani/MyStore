import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        lowercase: true,
      },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,  // Ensure that the price cannot be negative
    },
    duration: {
        type: String,  // Format: e.g., "2 hours", "30 minutes"
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'], // Enum to control service status
        default: 'active',
    },
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);

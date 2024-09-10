const mongoose = require('mongoose');

const sellSchema = new mongoose.Schema({
    deviceName: {
        type: String,
        required: true,
        trim: true,
    },
    estimatedPrice: {
        type: Number,
        required: true,
        min: 0,  
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v); 
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    userOffer: {
        type: Number,
        required: true,
        min: 0,  
    },
    photoUrl: {
        data: Buffer,
        contentType: String  
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],  
        default: 'pending',
    }
}, { timestamps: true });

module.exports = mongoose.model('Sell', sellSchema);

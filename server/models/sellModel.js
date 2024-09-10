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
        min: 0,  // Assure que le prix est toujours positif
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);  // Vérifie que le numéro de téléphone contient exactement 10 chiffres
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    userOffer: {
        type: Number,
        required: true,
        min: 0,  // Assure que l'offre de l'utilisateur est toujours positive
    },
    photoUrl: {
        type: String,  // Stocke l'URL de la photo plutôt que le Buffer
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],  // Restreint les valeurs possibles pour le statut
        default: 'pending',
    }
}, { timestamps: true });

// Index pour les recherches par nom d'appareil
sellSchema.index({ deviceName: 1 });

module.exports = mongoose.model('Sell', sellSchema);

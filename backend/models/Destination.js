const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Destination name is required'], 
        trim: true 
    },
    country: { 
        type: String, 
        required: [true, 'Country is required'], 
        trim: true 
    },
    description: { 
        type: String 
    },
    imageUrl: { 
        type: String,
        default: '' // placeholder
    }
}, { timestamps: true });

module.exports = mongoose.model('Destination', destinationSchema);
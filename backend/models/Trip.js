const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Trip title is required'], 
        trim: true 
    },
    destination: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Destination',
        required:[true, 'A destination must be assigned to the trip'] 
    },
    price: { 
        type: Number, 
        required:[true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    durationInDays: { 
        type: Number, 
        required: [true, 'Duration is required'],
        min: [1, 'Duration must be at least 1 day']
    },
    startDate: { 
        type: Date, 
        required: [true, 'Start date is required'] 
    },
    description: { 
        type: String 
    }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
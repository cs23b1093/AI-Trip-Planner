import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number
    },
    category: {
        type: String,
        enum: ['Attraction', 'Hotel', 'Cafe'],
        required: true
    },
    avgCost: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const Place = mongoose.model('Place', placeSchema);

export { Place };
import mongoose from "mongoose";

const itineraryItemSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Place', 'Hotel', 'Activity', 'Transport'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    estimatedCost: {
        type: Number,
        required: true
    },
    aiGenerated: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const ItineraryItem = mongoose.model('ItineraryItem', itineraryItemSchema);

export { ItineraryItem };

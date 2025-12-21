"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItineraryItem = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const itineraryItemSchema = new mongoose_1.default.Schema({
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
const ItineraryItem = mongoose_1.default.model('ItineraryItem', itineraryItemSchema);
exports.ItineraryItem = ItineraryItem;

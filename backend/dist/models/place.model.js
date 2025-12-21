"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Place = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const placeSchema = new mongoose_1.default.Schema({
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
});
const Place = mongoose_1.default.model('Place', placeSchema);
exports.Place = Place;

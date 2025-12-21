import mongoose from "mongoose";

export interface IPlace {
    name: string,
    city: string,
    country: string,
    longitude: number,
    latitude: number,
    category: string,
    avgCost: number,
    rating: number
}

const placeSchema = new mongoose.Schema<IPlace>({
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

const Place = mongoose.model<IPlace>('Place', placeSchema);

export { Place };
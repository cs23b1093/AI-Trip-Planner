import mongoose from "mongoose";

export interface ITrip {
    title: string,
    userId: object,
    totalCost: number,
    startDate: Date,
    endDate: Date,
    places: object,
    IItineraryItem: object,
    feedback: object
}

const tripSchema = new mongoose.Schema<ITrip> ({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    IItineraryItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItineraryItem',
        required: true
    },
    feedback: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback',
    }
})

const Trip = mongoose.model<ITrip>('Trip', tripSchema);

export { Trip }
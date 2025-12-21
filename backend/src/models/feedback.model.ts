import mongoose from "mongoose";

export interface IFeedback {
    userId: object,
    feedback: string,
    rating: number,
    tripId: object
}

const feedbackSchema = new mongoose.Schema<IFeedback>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
        required: true
    }
}, {
    timestamps: true
});

const Feedback = mongoose.model<IFeedback>('Feedback', feedbackSchema);

export { Feedback };
import mongoose from "mongoose";

const userCreditsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    creditsRemaining: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const UserCredits = mongoose.model('UserCredits', userCreditsSchema);

export { UserCredits };

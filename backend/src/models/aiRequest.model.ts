import mongoose from "mongoose";

const aiRequestSchema = new mongoose.Schema({
    prompt: {
        type: String,
        required: true
    },
    responseSummary: {
        type: String,
        required: true
    },
    modelUsed: {
        type: String,
        required: true
    },
    tokenUsed: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const AIRequest = mongoose.model('AIRequest', aiRequestSchema);

export { AIRequest };

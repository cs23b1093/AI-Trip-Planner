import mongoose from "mongoose";

export interface IAIRequest {
    prompt: string,
    responseSummary: string,
    modelUsed: string,
    tokenUsed: number
}

const aiRequestSchema = new mongoose.Schema<IAIRequest>({
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

const AIRequest = mongoose.model<IAIRequest>('AIRequest', aiRequestSchema);

export { AIRequest };

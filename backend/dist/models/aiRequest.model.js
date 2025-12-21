"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIRequest = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const aiRequestSchema = new mongoose_1.default.Schema({
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
const AIRequest = mongoose_1.default.model('AIRequest', aiRequestSchema);
exports.AIRequest = AIRequest;

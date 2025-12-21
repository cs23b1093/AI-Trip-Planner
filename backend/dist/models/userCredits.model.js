"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCredits = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userCreditsSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
const UserCredits = mongoose_1.default.model('UserCredits', userCreditsSchema);
exports.UserCredits = UserCredits;

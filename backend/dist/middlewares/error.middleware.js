"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const apiError_1 = require("../utils/apiError");
const logger_1 = require("../utils/logger");
const errorHandler = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof apiError_1.ApiError)) {
        const statusCode = error.statusCode || error instanceof mongoose_1.default.Error ? 400 : 500;
        const message = error.message || "Something went wrong";
        error = new apiError_1.ApiError(message, statusCode, false);
    }
    const response = Object.assign({ statusCode: error.statusCode, message: error.message }, (process.env.NODE_ENV === "development" ? { stack: error.stack } : {}));
    logger_1.logger.error(`${error.message}`);
    // Send response and return the Response object to satisfy TypeScript
    res.status(error.statusCode).json(response);
    return;
};
exports.errorHandler = errorHandler;
const mongoose_1 = __importDefault(require("mongoose"));

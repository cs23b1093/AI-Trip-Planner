import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import { logger } from "../utils/logger";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || error instanceof mongoose.Error ? 400 : 500;
        const message = error.message || "Something went wrong";
        error = new ApiError(message, statusCode, false);
    }

    const response = {
        statusCode: error.statusCode,
        message: error.message,
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {})
    };

    logger.error(`${error.message}`);

    // Send response and return the Response object to satisfy TypeScript
    res.status(error.statusCode).json(response);
    return;
};

export { errorHandler };

import mongoose from "mongoose";

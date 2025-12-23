import dotenv from "dotenv";
import connectDB from "./config/index";
import { logger } from './utils/logger';
import express from 'express';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/error.middleware';
import feedbackRouter from './routes/feedback.route';
import itineraryItemRouter from './routes/itineraryItem.route';
import aiRequestRouter from './routes/aiRequest.route';
import placeRouter from './routes/place.route'
import tripRouter from "./routes/trip.route";
import corsSetup from './utils/cors_setup';
import aj from "./config/arcjet";

dotenv.config({
    path: './.env'
});

const PORT = process.env.PORT || 8000;

const app = express();

app.use(corsSetup);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(async (req: any, res: any, next: any) => {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
        return res.status(403).json({
            error: "Request Denied",
            reason: decision.reason,
            id: decision.id
        })
    }
    next();
})

// Logger middleware
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Routes declaration
app.use("/api/v1/feedback", feedbackRouter);
app.use("/api/v1/itineraryItem", itineraryItemRouter);
app.use("/api/v1/aiRequest", aiRequestRouter);
app.use("/api/v1/place", placeRouter);
app.use("/api/v1/trip", tripRouter);

// Global Error Handler
app.use(errorHandler);

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            logger.info(`Server is running at port : ${PORT}`);
        })
    })
    .catch((err) => {
        logger.error("MONGO db connection failed !!! ", err);
    })

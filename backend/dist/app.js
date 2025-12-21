"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const logger_1 = require("./utils/logger");
const error_middleware_1 = require("./middlewares/error.middleware");
// Import routes
// import userRouter from './routes/user.route'; // Uncomment when user route is ready
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));
app.use(express_1.default.json({ limit: "16kb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" }));
app.use(express_1.default.static("public"));
app.use((0, cookie_parser_1.default)());
// Logger middleware
app.use((req, res, next) => {
    logger_1.logger.info(`${req.method} ${req.url}`);
    next();
});
// Routes declaration
// app.use("/api/v1/users", userRouter);
// Global Error Handler
app.use(error_middleware_1.errorHandler);

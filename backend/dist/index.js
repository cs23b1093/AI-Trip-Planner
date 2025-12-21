"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./db/index"));
const app_1 = require("./app");
const logger_1 = require("./utils/logger");
dotenv_1.default.config({
    path: './.env'
});
const PORT = process.env.PORT || 8000;
(0, index_1.default)()
    .then(() => {
    app_1.app.listen(PORT, () => {
        logger_1.logger.info(`Server is running at port : ${PORT}`);
    });
})
    .catch((err) => {
    logger_1.logger.error("MONGO db connection failed !!! ", err);
});

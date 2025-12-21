import express from "express";
import { deleteFeeback, getAllFeedback, createNewFeedback } from "../controllers/feedback.controller";
import { userMiddleware } from "../middleware/user.middleware";

const feedbackRouter = express.Router();

feedbackRouter.post('/', userMiddleware, createNewFeedback);
feedbackRouter.get('/', getAllFeedback);
feedbackRouter.delete('/:id', userMiddleware, deleteFeeback);

export default feedbackRouter;
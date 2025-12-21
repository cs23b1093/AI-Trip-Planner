import express from "express";
import { createNewAIRequest, getAllAIRequests, deleteAIRequest } from "../controllers/aiRequests.controller";
import { userMiddleware } from "../middleware/user.middleware";

const router = express.Router();

router.post('/', userMiddleware, createNewAIRequest);
router.get('/', getAllAIRequests);
router.delete('/:id', userMiddleware, deleteAIRequest);

export default router;
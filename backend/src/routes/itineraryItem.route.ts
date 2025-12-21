import express from "express";
import { deleteItineraryItem, getAllItineraryItems, createNewItineraryItem } from "../controllers/itineraryItem.controller";
import { userMiddleware } from "../middleware/user.middleware";

const router = express.Router();

router.post('/', userMiddleware, createNewItineraryItem);
router.get('/', getAllItineraryItems);
router.delete('/:id', userMiddleware, deleteItineraryItem);

export default router;
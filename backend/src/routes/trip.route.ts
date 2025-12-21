import express from 'express';
import { createNewTrip, getAllTrips, deleteTrip } from '../controllers/trip.controller';
import { userMiddleware } from '../middleware/user.middleware';

const tripRouter = express.Router();

tripRouter.post('/', userMiddleware, createNewTrip);
tripRouter.get('/', getAllTrips);
tripRouter.delete('/:id', userMiddleware, deleteTrip);

export default tripRouter;
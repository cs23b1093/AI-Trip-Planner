import express from 'express';
import { getPlaces } from '../controllers/place.controller';

const placeRouter = express.Router();

placeRouter.route('/').get(getPlaces);

export default placeRouter;
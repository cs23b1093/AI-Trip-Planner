import { Trip } from "../models/trip.model";
import { logger } from "../utils/logger";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";

const createNewTrip = asyncHandler(async (req: any, res: any) => {
    try {
        const body = req.body;
        const userId = req.user;
        if (!userId) throw new ApiError('User not found', 404, true);
    
        const trip = new Trip({...body});
        const result = await trip.save();
        if (!result) throw new ApiError('Trip not saved to database', 500, true);
    
        logger.info('Trip created successfully');
        res.status(201).json({
            success: true,
            message: 'Trip created successfully',
            data: result
        })
    } catch (error: any) {
        logger.error ('trip is not saved');
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
            stack: error.stack,
        })
    }
});

const getAllTrips = asyncHandler(async (req: any, res: any) => {
    try {
        const trips = await Trip.find();
        if (!trips) throw new ApiError('Trips not found', 404, true);
    
        logger.info('Trips retrieved successfully');
        res.status(200).json({
            success: true,
            message: 'Trips retrieved successfully',
            data: trips
        })
    } catch (error: any) {
        logger.error ('trips is not retrieved');
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
            stack: error.stack,
        })
    }
});

const deleteTrip = asyncHandler (async (req: any, res: any) => {
    try {
        const tripId = req.params.id;
        const userId = req.user;
        if (!userId) throw new ApiError('User not found', 404, true);
        
        const result = await Trip.findByIdAndDelete(tripId);
        if (!result) throw new ApiError('Trip not deleted', 500, true);
    
        logger.info('Trip deleted successfully');
        res.status(200).json({
            success: true,
            message: 'Trip deleted successfully',
            data: result
        })
    } catch (error: any) {
        logger.info('Trip is not deleted');
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
            stack: error.stack,
        })
    }
})

export {
    deleteTrip,
    getAllTrips,
    createNewTrip
}
import { Place } from "../models/place.model";
import { asyncHandler } from "../utils/asyncHandler";
import { logger } from "../utils/logger";
import { ApiError } from "../utils/apiError";

const getPlaces = asyncHandler (async (req: any, res: any) => {
    logger.info('getting places...');

    try {
        const places = await Place.find();
        if (places) {
            logger.info('get all places from database');
            res.status(200).json({
                message: 'places fetched successfully',
                status: 200,
                success: true,
                data: places
            })
        } else throw new ApiError('places not found', 404, true);
    } catch (error: any) {
        logger.error('getting places failed');
        res.status(error.status || 500).json({
            message: error.message || 500,
            stack: error.stack,
            status: error.status || 500,
            success: false
        })
    }
})

export { getPlaces };
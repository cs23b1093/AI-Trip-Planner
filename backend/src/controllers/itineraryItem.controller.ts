import { ItineraryItem } from "../models/itineraryItem.model";
import { logger } from "../utils/logger";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";

const createNewItineraryItem = asyncHandler(async (req: any, res: any) => {
    try {
        const body = req.body;
        const userId = req.user;
        if (!userId) throw new ApiError('User not found', 404, true);
    
        const itineraryItem = new ItineraryItem({...body});
        const result = await itineraryItem.save();
        if (!result) throw new ApiError('ItineraryItem not saved to database', 500, true);
    
        logger.info('ItineraryItem created successfully');
        res.status(201).json({
            success: true,
            message: 'ItineraryItem created successfully',
            data: result
        })
    } catch (error: any) {
        logger.error ('itineraryItem is not saved');
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
            stack: error.stack,
        })
    }
});

const getAllItineraryItems = asyncHandler(async (req: any, res: any) => {
    try {
        const itineraryItems = await ItineraryItem.find();
        if (!itineraryItems) throw new ApiError('ItineraryItems not found', 404, true);
    
        logger.info('ItineraryItems retrieved successfully');
        res.status(200).json({
            success: true,
            message: 'ItineraryItems retrieved successfully',
            data: itineraryItems
        })
    } catch (error: any) {
        logger.error ('itineraryItems is not retrieved');
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
            stack: error.stack,
        })
    }
});

const deleteItineraryItem = asyncHandler (async (req: any, res: any) => {
    try {
        const itineraryItemId = req.params.id;
        const userId = req.user;
        if (!userId) throw new ApiError('User not found', 404, true);
        
        const result = await ItineraryItem.findByIdAndDelete(itineraryItemId);
        if (!result) throw new ApiError('ItineraryItem not deleted', 500, true);
    
        logger.info('ItineraryItem deleted successfully');
        res.status(200).json({
            success: true,
            message: 'ItineraryItem deleted successfully',
            data: result
        })
    } catch (error: any) {
        logger.info('ItineraryItem is not deleted');
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
            stack: error.stack,
        })
    }
})

export {
    deleteItineraryItem,
    getAllItineraryItems,
    createNewItineraryItem
}
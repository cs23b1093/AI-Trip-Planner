import { Feedback } from "../models/feedback.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { logger } from "../utils/logger";

const createNewFeedback = asyncHandler(async (req: any, res: any) => {
    try {
        const body = req.body;
        const userId = req.user;
        if (!userId) throw new ApiError('User not found', 404, true);
    
        const feedback = new Feedback({...body});
        const result = await feedback.save();
        if (!result) throw new ApiError('Feedback not saved to database', 500, true);
    
        logger.info('Feedback created successfully');
        res.status(201).json({
            success: true,
            message: 'Feedback created successfully',
            data: result
        })
    } catch (error: any) {
        logger.error ('feedback is not saved');
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
            stack: error.stack,
        })
    }
});

const getAllFeedback = asyncHandler(async (req: any, res: any) => {
    try {
        const feedback = await Feedback.find();
        if (!feedback) throw new ApiError('Feedback not found', 404, true);
    
        logger.info('Feedback retrieved successfully');
        res.status(200).json({
            success: true,
            message: 'Feedback retrieved successfully',
            data: feedback
        })
    } catch (error: any) {
        logger.error ('feedback is not retrieved');
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
            stack: error.stack,
        })
    }
});

const deleteFeeback = asyncHandler (async (req: any, res: any) => {
    try {
        const feedbackId = req.params.id;
        const userId = req.user;
        if (!userId) throw new ApiError('User not found', 404, true);
        
        const result = await Feedback.findByIdAndDelete(feedbackId);
        if (!result) throw new ApiError('Feedback not deleted', 500, true);
    
        logger.info('Feedback deleted successfully');
        res.status(200).json({
            success: true,
            message: 'Feedback deleted successfully',
            data: result
        })
    } catch (error: any) {
        logger.info('Feedback is not deleted');
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
            stack: error.stack,
        })
    }
})

export {
    deleteFeeback,
    getAllFeedback,
    createNewFeedback
}
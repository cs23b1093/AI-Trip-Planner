import { AIRequest } from "../models/aiRequest.model";
import { logger } from "../utils/logger";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";

const createNewAIRequest = asyncHandler(async (req: any, res: any) => {
    try {
        const body = req.body;
        const userId = req.user;
        if (!userId) throw new ApiError('User not found', 404, true);
    
        const aiRequest = new AIRequest({...body});
        const result = await aiRequest.save();
        if (!result) throw new ApiError('AI Request not saved to database', 500, true);
    
        logger.info('AI Request created successfully');
        res.status(201).json({
            success: true,
            message: 'AI Request created successfully',
            data: result
        })
    } catch (error: any) {
        logger.error ('ai request is not saved');
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
            stack: error.stack,
        })
    }
});

const getAllAIRequests = asyncHandler(async (req: any, res: any) => {
    try {
        const aiRequests = await AIRequest.find();
        if (!aiRequests) throw new ApiError('AI Requests not found', 404, true);
    
        logger.info('AI Requests retrieved successfully');
        res.status(200).json({
            success: true,
            message: 'AI Requests retrieved successfully',
            data: aiRequests
        })
    } catch (error: any) {
        logger.error ('ai requests is not retrieved');
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
            stack: error.stack,
        })
    }
});

const deleteAIRequest = asyncHandler (async (req: any, res: any) => {
    try {
        const aiRequestId = req.params.id;
        const userId = req.user;
        if (!userId) throw new ApiError('User not found', 404, true);
        
        const result = await AIRequest.findByIdAndDelete(aiRequestId);
        if (!result) throw new ApiError('AI Request not deleted', 500, true);
    
        logger.info('AI Request deleted successfully');
        res.status(200).json({
            success: true,
            message: 'AI Request deleted successfully',
            data: result
        })
    } catch (error: any) {
        logger.info('AI Request is not deleted');
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
            stack: error.stack,
        })
    }
})

export {
    deleteAIRequest,
    getAllAIRequests,
    createNewAIRequest
}
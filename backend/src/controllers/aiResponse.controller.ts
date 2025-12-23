import hf from "../config/huggingface";
import { logger } from "../utils/logger";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import aj from "../config/arcjet";

const AI_Response = asyncHandler(async (req: any, res: any) => {
    logger.info("Generating AI response...");
    try {
        const decision = await aj.protect(req);
        if (decision.isDenied()) {
            return res.status(403).json({
                error: "Request Denied",
                reason: decision.reason,
                id: decision.id
            })
        };

        const { message } = req.body;
        
        const response = await hf.textGeneration({
            model: "",
            inputs: message,
            parameters: {
                max_new_tokens: 100
            }
        })

        if (!response) throw new ApiError("Response is not generated!", 401, true)

    } catch (error: any) {
        logger.error("Generating AI response failed", error);
        res.json({
            message: "Generating AI response failed",
            stack: error.stsck,
            success: false
        })
    }
})

export { AI_Response };
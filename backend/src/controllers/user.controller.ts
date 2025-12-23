// import User from '../models/user.model.ts';
import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { logger } from "../utils/logger";
import aj from "../config/arcjet";

const registerUser = asyncHandler(async (req: any, res: any, next: any) => {
    logger.info('Registering user...');
    
    try {
        const decision = await aj.protect(req);
        if (decision.isDenied()) {
            return res.status(403).json({
                error: "Request Denied",
                reason: decision.reason,
                id: decision.id
            })
        };
        const { name, email, password } = req.body;
    
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            throw new ApiError('User already exists', 400, true);
        }

        const user = await User.create({ fullName: name, email, password });
        res.json({
            message: "User registered successfully",
            user,
            status: 200,
            success: true
        })
    } catch (error) {
        logger.error('Registering user failed', error);
        res.json({
            message: "Registering user failed",
            error: error
        })
    }
})

const loginUser = asyncHandler(async (req: any, res: any, _: any) => {
    logger.info("Logging the user...");
    try {
        const decision = await aj.protect(req);
        if (decision.isDenied()) {
            return res.status(403).json({
                error: "Request Denied",
                reason: decision.reason,
                id: decision.id
            })
        };

        const { username, password } = req.body;

        const userId = req.userId;
        const user = await User.findById({ userId });
        if (!user) throw new ApiError("user does not exits", 404, true);

        const isPasswordCorrect: boolean = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            throw new ApiError("Invalid password", 401, true);
        }

        const { accessToken, refreshToken } = await user.generateToken();

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
        
        res.cookie("refreshToken", refreshToken, options);
        res.cookie("accessToken", accessToken, options);
        res.json({
            message: "User logged in successfully",
            user,
            accessToken,
            refreshToken,
            status: 200,
            success: true
        })
    } catch (error) {
        logger.error("Logging user failed", error);
        res.json({
            message: "Logging user failed",
            error: error
        })
    }
})

const LogoutUser = asyncHandler (async (req: any, res: any) => {
    logger.info("Logging Out User...");

    try {
        const decision = await aj.protect(req);
        if (decision.isDenied()) {
            return res.status(403).json({
                error: "Request Denied",
                reason: decision.reason,
                id: decision.id
            })
        };

        const userId = req.userId;

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        }

        res.clearCookie('accessToken', options);
        logger.info('user logout successfully');
        res.status(200).json({
            message: "user logout successfully",
            status: 200,
            success: true
        })
    } catch (error: any) {
        logger.error("Logging out user is failed");
        res.status(error.status || 500).json({
            message: "Logging out user failed",
            staus: error.staus || 500,
            stack: error.stack
        })
    }
})

const changePassword = asyncHandler(async (req: any, res: any) => {
    logger.info('requesting for change the password...');

    try {
        const decision = await aj.protect(req);
        if (decision.isDenied()) {
            return res.status(403).json({
                error: "Request Denied",
                reason: decision.reason,
                id: decision.id
            })
        };

        const { newPassword } = req.body;
        const userId = req.userId;

        const user = await User.findById({ userId });
        if (user) {
            user.password = newPassword;
            await user.save();

            logger.info('password changed successfully');
            res.status(201).json({
                message: "password changes successfully",
                status: 201,
                success: true
            })
        } else {
            throw new ApiError('password not changed or user not exists', 404, true);
        }
    } catch (error: any) {
        logger.error('password cannot changed');
        res.status(error.status || 500).josn({
            message: error.message || "password channge failed",
            stack: error.stack,
            status: error.status || 500,
            success: false
        })
    }
})

export { registerUser,
    LogoutUser,
    loginUser,
    changePassword
}
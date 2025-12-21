import { ApiError } from "../utils/apiError";
import { logger } from "../utils/logger";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userMiddleware = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return next(new ApiError("Unauthorized", 401, true));
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decodedToken;
        next();
    } catch (error) {
        return next(new ApiError("Unauthorized", 401, true));
    }
}

export { userMiddleware };
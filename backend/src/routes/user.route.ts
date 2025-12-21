import { userMiddleware } from "../middleware/user.middleware";
import express from "express";
import { registerUser, LogoutUser, loginUser, changePassword } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route('/login').post(userMiddleware, loginUser);
userRouter.route('/logout').post(userMiddleware, LogoutUser);
userRouter.route('/change-password').put(userMiddleware, changePassword);

export { userRouter };
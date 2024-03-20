import express from "express";
import { UserController } from "../controller/user.controller.js";
import verifyToken from '../middleware/verify_token.js'

const UserRouter = express.Router();

UserRouter.post("/register", UserController.register);

UserRouter.post("/login", UserController.login);


UserRouter.post("/create-profile", verifyToken, UserController.createProfile);

UserRouter.post("/update-profile", verifyToken, UserController.updateProfile);

UserRouter.post("/delete-profile", verifyToken, UserController.deleteProfile);

export { UserRouter };

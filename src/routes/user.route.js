import express from "express";
import { UserController } from "../controller/user.controller.js";
import verifyToken from '../middleware/verify_token.js'

const UserRouter = express.Router();

UserRouter.post("/register", UserController.register);

UserRouter.post("/login", UserController.login);

UserRouter.delete("/delete-user", verifyToken, UserController.deleteUser);

UserRouter.put("/update-user", verifyToken, UserController.updateUser);


UserRouter.post("/create-profile", verifyToken, UserController.createProfile);

UserRouter.put("/update-profile", verifyToken, UserController.updateProfile);

UserRouter.delete("/delete-profile", verifyToken, UserController.deleteProfile);

export { UserRouter };

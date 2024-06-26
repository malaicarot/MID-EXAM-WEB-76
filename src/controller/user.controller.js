import { UserService } from "../service/user.service.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

async function register(req, res) {
  try {
    const user = req.body;

    res.json(await UserService.register(user));
  } catch (error) {
    console.error("Error while register!!");
    res.send({ msg: error.message });
  }
}

async function login(req, res) {
  try {
    const info = req.body;

    res.json(await UserService.login(info));

  } catch (error) {

    console.error("Error while login!!");

    res.send({ msg: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const decode = jwt.verify(
      req.header("access-token"),
      process.env.SECRET_KEY
    );
    const userId = decode.userId;
    res.json(await UserService.deleteUser(userId));
  } catch (error) {
    console.error("Error while delete account!!");
    res.send({ msg: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const newInfo = req.body;
    const decode = jwt.verify(
      req.header("access-token"),
      process.env.SECRET_KEY
    );
    const userId = decode.userId;
    res.json(await UserService.updateUser(newInfo, userId));
  } catch (error) {
    console.error("Error while update account!!");
    res.send({ msg: error.message });
  }
}

async function createProfile(req, res) {
  try {
    const decode = jwt.verify(
      req.header("access-token"),
      process.env.SECRET_KEY
    );
    const profile = req.body;
    const userId = decode.userId;
    console.log(userId);

    res.json(await UserService.createProfile(profile, userId));
  } catch (error) {
    console.error("Error while create profile!!");
    res.send({ msg: error.message });
  }
}

async function updateProfile(req, res) {
  try {
    const newProfile = req.body;
    const decode = jwt.verify(
      req.header("access-token"),
      process.env.SECRET_KEY
    );
    const userId = decode.userId;

    res.json(await UserService.updateProfile(newProfile, userId));
  } catch (error) {
    console.error("Error while update profile!!");
    res.send({ msg: error.message });
  }
}

async function deleteProfile(req, res) {
  try {
    const decode = jwt.verify(
      req.header("access-token"),
      process.env.SECRET_KEY
    );
    const userId = decode.userId;

    res.json(await UserService.deleteProfile(userId));
  } catch (error) {
    console.error("Error while delete profile!!");
    res.send({ msg: error.message });
  }
}



export const UserController = {
  register,
  login,
  deleteUser,
  updateUser,
  createProfile,
  updateProfile,
  deleteProfile,
};

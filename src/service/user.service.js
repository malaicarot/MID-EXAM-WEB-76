import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";
import * as dotenv from "dotenv";
import profileModel from "../model/profile.model.js";
dotenv.config();

function isValidEmail(email) {
  const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailPattern.test(email);
}

async function register(user) {
  const checkEmailExist = await userModel.findOne({ email: user.email });
  if (checkEmailExist || !isValidEmail(user.email)) {
    throw new Error("Email is invalid!");
  }

  const salt = await bcrypt.genSalt(10);

  const hashPass = await bcrypt.hash(user.passWord, salt);

  const newUser = new userModel({
    userName: user.userName,
    email: user.email,
    birthDay: user.birthDay,
    birthPlace: user.birthPlace,
    nation: user.nation,
    passWord: hashPass,
  });

  return await newUser.save();
}

async function login(info) {
  const userDB = await userModel.findOne({ email: info.email });

  if (!userDB || userDB === null) {
    throw new Error("User is not exits!");
  }

  const checkPass = bcrypt.compareSync(info.passWord, userDB.passWord);

  if (!checkPass) {
    throw new Error("Password is invalid!");
  }
  const token = jwt.sign({ userId: userDB._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  return await { token: token };
}

async function createProfile(profile, userId) {
  const newProfile = new profileModel({
    userId: userId,
    skill: profile.skill,
    hobbies: profile.hobbies,
    target: profile.target,
  });

  return await newProfile.save();
}

async function updateProfile(profile, userId) {
  const oldProfile = await profileModel.findOne({ userId: userId });

  if (!oldProfile) {
    throw new Error("Profile is not create!");
  }

  for (const key in profile) {
    oldProfile[key] = profile[key];
  }

  return await oldProfile.save();
}

async function deleteProfile(userId) {
  const currentProfile = await profileModel.findOne({ userId: userId });

  if (!currentProfile) {
    throw new Error("Profile is not create!");
  }

  return await profileModel.deleteOne({ userId: userId });
}

async function deleteUser(userId) {
  const currentAccount = await userModel.findOne({
    _id: userId,
  });


  if (!currentAccount) {
    throw new Error("User is not create!");
  }

  return await currentAccount.deleteOne({ userId: userId });
}

async function updateUser(newInfo, userId) {
  const currentAccount = await userModel.findOne({
    _id: userId,
  });
  if (!currentAccount) {
    throw new Error("User is not create!");
  }

  const genSalt = await bcrypt.genSalt(10);

  newInfo.passWord = bcrypt.hashSync(newInfo.passWord, genSalt);

  for(const key in newInfo ){
    
    currentAccount[key] = newInfo[key];
  }

  return await currentAccount.save();
}

export const UserService = {
  register,
  login,
  deleteUser,
  updateUser,
  createProfile,
  updateProfile,
  deleteProfile,
};

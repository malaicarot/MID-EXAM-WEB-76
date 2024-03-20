import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  birthDay: { type: String, require: true },
  birthPlace: { type: String, require: true },
  nation: { type: String, require: true },
  passWord: { type: String, require: true },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;

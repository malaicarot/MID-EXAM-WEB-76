import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId : { type: String, ref: 'users', require: true },
  skill: { type: Array, require: true },
  hobbies: { type: String, require: true },
  target: { type: Array, require: true },
});


const profileModel = mongoose.model("profiles", profileSchema);

export default profileModel;
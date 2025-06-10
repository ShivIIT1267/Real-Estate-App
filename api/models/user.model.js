// this is simply the way we keep the data of the user
// user inputs these data somewhere and we can then use it anywhere required

import mongoose from "mongoose";

// this is the schema of the model, how will user look like for the website
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// this is how we create a model

const User = mongoose.model("User", userSchema);

// using this export default, we can use the model anywhere in our app

export default User;

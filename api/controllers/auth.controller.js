import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res, next) => {
  // the api will take input and now we want to store it in
  // our database

  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 12);
  const newUser = new User({ username, email, password: hashedPassword });

  // we do a try catch thing that if error is detected then
  // then we print the error message.
  try {
    await newUser.save();
    res.status(201).json("User Created Successfully");
  } catch (error) {
    // later in project we can try to have manual errors.
    next(error);
  }
};

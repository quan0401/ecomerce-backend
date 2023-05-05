import User from "../models/UserModel";
import hassPassword from "../utils/hassPassword";
require("dotenv").config();

export const getAll = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log({ firstName, lastName, email, password });
    if (!(firstName && lastName && email && password))
      res.status(400).send("All input are required");

    const hassPass = hassPassword(password);

    const userExisted = await User.findOne({ email });

    if (userExisted) res.status(400).send("User exists");
    const result = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hassPass,
    });

    res
      .cookie("access_token", "fake access token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(201)
      .send(result);
  } catch (error) {
    next(error);
  }
};

import User from "../models/UserModel";
import generateAuthToken from "../utils/generateAuthToken";
import { comparePassword, hassPassword } from "../utils/password";
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
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hassPass,
    });

    res
      .cookie(
        "access_token",
        generateAuthToken(
          user._id,
          user.firstName,
          user.lastName,
          user.email,
          user.isAdmin
        ),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        }
      )
      .status(201)
      .send(user);
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password, doNotLogout } = req.body;
    if (!(email && password)) res.status(400).send("Wrong credentials");

    const user = await User.findOne({ email });
    const check = comparePassword(password, user.password);
    if (!check) res.status(400).send("Wrong credentials");

    let cookieParams = {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    };

    if (doNotLogout) cookieParams["maxAge"] = 300 * 1000;

    res
      .cookie(
        "access_token",
        generateAuthToken(
          user._id,
          user.firstName,
          user.lastName,
          user.email,
          user.isAdmin
        ),
        cookieParams
      )
      .status(200)
      .json({
        success: "User logged in",
        userLoggedIn: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      });
  } catch (error) {
    next(error);
  }
};

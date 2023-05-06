import User from "../models/UserModel";
import Review from "../models/ReviewModel";
import mongoose from "mongoose";
import generateAuthToken from "../utils/generateAuthToken";
import { comparePassword, hassPassword } from "../utils/password";
import Product from "../models/ProductModel";
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

    const cookieParams = {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    };

    if (doNotLogout) cookieParams["maxAge"] = 300 * 1000 * 6;

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

export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    const check = comparePassword(req.body.oldPassword, user.password);
    if (!check) res.status(401).send("Wrong password");

    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    if (req.body.oldPassword !== req.body.password)
      user.password = hassPassword(req.body.password);
    user.phoneNumber = req.body.phoneNumber;
    user.country = req.body.country;
    user.city = req.body.city;
    user.zipCode = req.body.zipCode;

    const result = await user.save();

    res.status(201).json({
      success: "Update success",
      userUpdated: {
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

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .orFail();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const writeReview = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const { rating, comment } = req.body;

    // Create reviewId manually since it also need to save for product
    const reviewId = new mongoose.Types.ObjectId();
    const result = await Review.create({
      _id: reviewId,
      rating: Number(rating),
      comment,
      user: {
        _id: req.user._id,
        name: req.user.firstName + " " + req.user.lastName,
      },
    });

    const product = await Product.findById(productId)
      .populate("reviews")
      .orFail();

    // Calculate total rating
    const totalRating =
      product.reviews.reduce(
        (acc, currentValue) => Number(currentValue.rating) + acc,
        0
      ) + Number(rating);

    product.reviews.push(reviewId);

    product.reviewsNumber = product.reviews.length;
    product.rating = totalRating / product.reviewsNumber;

    const save = await product.save();

    res.status(200).send({ product: save });
  } catch (error) {
    next(error);
  }
};

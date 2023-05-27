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
    if (!(firstName && lastName && email && password))
      res.status(400).send({ EM: "All input are required", EC: 1 });

    const hassPass = hassPassword(password);

    const userExisted = await User.findOne({ email });

    if (userExisted) res.status(400).send({ EM: "Email is taken", EC: 1 });
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
      .send({ user, EC: 0, EM: "Account is successfully created" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, doNotLogout } = req.body;
    if (!(email && password))
      res.status(400).send({ EM: "All inputs are required", EC: 1 });

    const user = await User.findOne({ email }).orFail();
    const check = comparePassword(password, user.password);
    if (!check) res.status(400).send({ EM: "Wrong credentials", EC: 1 });

    const cookieParams = {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    };

    if (doNotLogout) cookieParams["maxAge"] = 300 * 12 * 1000;

    return res
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
        EC: 0,
        EM: "User logged in",
        userLoggedIn: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
          doNotLogout,
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
      .select("-password -createdAt -updatedAt -__v")
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
    const session = await Review.startSession();
    session.startTransaction();

    // Create reviewId manually since it also need to save for productModel
    const reviewId = new mongoose.Types.ObjectId();
    await Review.create({
      _id: reviewId,
      rating: Number(rating),
      comment,
      user: {
        _id: req.user._id,
        name: req.user.firstName + " " + req.user.lastName,
      },
      session: session,
    });

    const product = await Product.findById(productId)
      .populate("reviews")
      .orFail()
      .session(session);

    // Calculate total rating
    const totalRating =
      product.reviews.reduce(
        (acc, currentValue) => Number(currentValue.rating) + acc,
        0
      ) + Number(rating);

    product.reviews.push(reviewId);

    product.reviewsNumber = product.reviews.length;
    product.rating = Math.ceil((totalRating / product.reviewsNumber) * 10) / 10;

    const save = await product.save();

    await session.commitTransaction();
    await session.endSession();

    res.status(200).send({ product: save, EC: 0 });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { email, firstName, lastName, isAdmin } = await User.findById(
      req.params.id
    )
      .select("firstName lastName email isAdmin")
      .orFail();

    res.status(200).json({ email, firstName, lastName, isAdmin });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select("firstName lastName email isAdmin")
      .orFail();

    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const savedUser = await user.save();

    res.status(200).json({ savedUser, EM: "Updated user successfully", EC: 0 });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    const result = await user.deleteOne();
    res.status(200).send({ EC: 0, EM: "Deleted user" });
  } catch (error) {
    next(error);
  }
};

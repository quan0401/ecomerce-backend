import express from "express";
import {
  getAll,
  registerUser,
  login,
  updateUserProfile,
  getUserProfile,
  writeReview,
  getUser,
  updateUser,
  deleteUser,
} from "../controller/userController";
import { verifyAdmin, verifyIsLoggedIn } from "../middleware/verifyAuthToken";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", login);

// Middleware logged in
userRoutes.use(verifyIsLoggedIn);
userRoutes.get("/profile/:id", getUserProfile);
userRoutes.put("/profile", updateUserProfile);
userRoutes.post("/review/:productId", writeReview);

// Admin routes
userRoutes.use(verifyAdmin);
userRoutes.get("/", getAll);
userRoutes.get("/:id", getUser);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;

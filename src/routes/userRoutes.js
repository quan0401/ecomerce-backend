import express from "express";
import { getAll, registerUser, login } from "../controller/userController";

const userRoutes = express.Router();

userRoutes.get("/", getAll);
userRoutes.post("/register", registerUser);
userRoutes.post("/login", login);

export default userRoutes;

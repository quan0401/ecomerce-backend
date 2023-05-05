import express from "express";
import { getAll, registerUser } from "../controller/userController";

const userRoutes = express.Router();

userRoutes.get("/", getAll);
userRoutes.post("/register", registerUser);

export default userRoutes;

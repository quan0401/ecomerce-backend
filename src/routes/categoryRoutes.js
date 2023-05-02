import express from "express";
import { getAllController } from "../controller/categoryController";

const router = express.Router();

router.get("/getAll", getAllController);

export default router;

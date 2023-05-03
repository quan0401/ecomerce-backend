import express from "express";
import {
  deleteCategoryController,
  getAllController,
  newCategoryController,
  saveAttributeController,
} from "../controller/categoryController";

const router = express.Router();

router.get("/", getAllController);

router.post("/", newCategoryController);

router.delete("/:category", deleteCategoryController);

router.post("/attribute", saveAttributeController);

export default router;

import express from "express";
import {
  deleteCategoryController,
  getAllController,
  newCategoryController,
  saveAttributeController,
} from "../controller/categoryController";

import { verifyAdmin, verifyIsLoggedIn } from "../middleware/verifyAuthToken";

const router = express.Router();

router.get("/", getAllController);

router.use(verifyIsLoggedIn, verifyAdmin);

router.post("/", newCategoryController);

router.delete("/:category", deleteCategoryController);

router.post("/attribute", saveAttributeController);

export default router;

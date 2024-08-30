import express from "express";
import formidable from 'express-formidable';
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  getCategoryPhotourlController,
  singleCategoryController,
  updateCategoryController,
} from "./../controllers/categoryController.js";
import { getServicePhotourlController } from "../controllers/serviceController.js";

const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
  requireSignIn,
  formidable(),
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  formidable(),
  isAdmin,
  updateCategoryController
);

//getAll category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller
);

//Get URL of photo by id
router.get('/category/photoURL/:id', getCategoryPhotourlController);

export default router;
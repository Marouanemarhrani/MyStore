import express from "express";
import formidable from 'express-formidable';
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  brandController,
  createBrandController,
  deleteBrandController,
  getBrandPhotourlController,
  singleBrandController,
  updateBrandController,
} from "./../controllers/brandController.js";

const router = express.Router();

//routes
// create brand
router.post(
  "/create-brand",
  requireSignIn,
  formidable(),
  isAdmin,
  createBrandController
);

//update brand
router.put(
  "/update-brand/:id",
  requireSignIn,
  formidable(),
  isAdmin,
  updateBrandController
);

//getAll brand
router.get("/get-brand", brandController);

//single brand
router.get("/single-brand/:slug", singleBrandController);

//delete brand
router.delete(
  "/delete-brand/:id",
  requireSignIn,
  isAdmin,
  deleteBrandController
);

//Get URL of photo by id
router.get('/brand/photoURL/:id', getBrandPhotourlController);

export default router;
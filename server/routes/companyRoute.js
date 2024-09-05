import express from "express";
import formidable from 'express-formidable';
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  companyController,
  createCompanyController,
  deleteCompanyController,
  getCompanyPhotourlController,
  getSpecificCompanies,
  singleCompanyController,
  updateCompanyController,
} from "./../controllers/companyController.js";

const router = express.Router();

//routes
// create company
router.post(
  "/create-company",
  requireSignIn,
  formidable(),
  isAdmin,
  createCompanyController
);

//update company
router.put(
  "/update-company/:id",
  requireSignIn,
  formidable(),
  isAdmin,
  updateCompanyController
);

//getAll company
router.get("/get-company", companyController);

//single company
router.get("/single-company/:slug", singleCompanyController);

//delete company
router.delete(
  "/delete-company/:id",
  requireSignIn,
  isAdmin,
  deleteCompanyController
);

//Get URL of photo by id
router.get('/company/photoURL/:id', getCompanyPhotourlController);

//getAll company
router.get("/getapple", getSpecificCompanies);

export default router;
const express = require('express');
const formidable = require('express-formidable');
const { isAdmin, requireSignIn } = require('../middlewares/authMiddleware');
const {
  companyController,
  createCompanyController,
  deleteCompanyController,
  getCompanyPhotourlController,
  getSpecificCompanies,
  singleCompanyController,
  updateCompanyController,
} = require('../controllers/companyController');

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

//getAll specific companies
router.get("/getapple", getSpecificCompanies);

module.exports = router;

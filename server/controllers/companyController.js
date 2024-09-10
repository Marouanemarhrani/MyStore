const companyModel = require('../models/companyModel');
const slugify = require('slugify');
const fs = require('fs');

const validateCompanyFields = (fields, files) => {
  const { name, category } = fields;
  const { photo } = files;
  if (!name) return { error: "Name is required" };
  if (!category) return { error: "Category is required" };
  if (!photo || photo.size > 1000000) return { error: "Photo is required and should be less than 1MB" };
  return null;
};

// Create company
const createCompanyController = async (req, res) => {
  try {
      const validationError = validateCompanyFields(req.fields, req.files);
      if (validationError) return res.status(400).send(validationError);

      const { name } = req.fields;
      const { photo } = req.files;
      const existingCompany = await companyModel.findOne({ name });
      if (existingCompany) {
        return res.status(200).send({
          success: false,
          message: "Company Already Exists",
        });
      }
      const company = new companyModel({ ...req.fields, slug: slugify(name) });

      if (photo) {
        company.photo.data = fs.readFileSync(photo.path);
        company.photo.contentType = photo.type;
      }

      await company.save();
      res.status(201).send({
        success: true,
        message: 'Company created successfully',
        company,
      });
  } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: 'Error creating company',
        error,
      });
  }
};

// Update company
const updateCompanyController = async (req, res) => {
  try {
      const validationError = validateCompanyFields(req.fields, req.files);
      if (validationError) return res.status(400).send(validationError);

      const { name } = req.fields;
      const { photo } = req.files;
      const company = await companyModel.findByIdAndUpdate(
          req.params.id,
          { ...req.fields, slug: slugify(name) },
          { new: true }
      );

      if (photo) {
        company.photo.data = fs.readFileSync(photo.path);
        company.photo.contentType = photo.type;
      }

      await company.save();
      res.status(200).send({
        success: true,
        message: 'Company updated successfully',
        company,
      });
  } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: 'Error updating company',
        error,
      });
  }
};

// Get all companies
const companyController = async (req, res) => {
  try {
    const companies = await companyModel.find({}).select("-photo").populate("category");
    res.status(200).send({
      success: true,
      message: "All Companies List",
      companies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all companies",
    });
  }
};

// Get single company
const singleCompanyController = async (req, res) => {
  try {
    const company = await companyModel.findOne({ slug: req.params.slug }).select("-photo").populate("category");
    res.status(200).send({
      success: true,
      message: "Get Single Company Successfully",
      company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single company",
    });
  }
};

// Delete company
const deleteCompanyController = async (req, res) => {
  try {
    const { id } = req.params;
    await companyModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Company Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting company",
      error,
    });
  }
};

// Get company photo URL
const getCompanyPhotourlController = async (req, res) => {
  try {
      const photoURL = await companyModel.findById(req.params.id).select("photo");
      if (photoURL.photo.data) {
          res.set("Content-type", photoURL.photo.contentType);
          return res.status(200).send(photoURL.photo.data);
      }
  } catch (error) {
      console.log(error);
      res.status(500).send({
          success: false,
          message: "There was an error in getting the photo URL",
          error,
      });
  }
};

// Get specific companies
const getSpecificCompanies = async (req, res) => {
  try {
    // Hard-coded array of company names
    const names = ["Apple iPhone", "Apple Macbook", "Apple Watch", "Apple iPad", "Apple Airpods"];

    // Use the $in operator to find documents where the value of "name" is in the provided array
    const companies = await companyModel.find({
      name: { $in: names }
    });

    if (companies.length === 0) {
      return res.status(404).json({ message: 'No companies found' });
    } else {
      res.status(200).send({
        success: true,
        message: "Companies retrieved successfully",
        companies,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCompanyController,
  updateCompanyController,
  companyController,
  singleCompanyController,
  deleteCompanyController,
  getCompanyPhotourlController,
  getSpecificCompanies,
};

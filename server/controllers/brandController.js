const brandModel = require('../models/brandModel');
const slugify = require('slugify');
const fs = require('fs');

const validateBrandFields = (fields, files) => {
  const { name, company, category } = fields;
  const { photo } = files;
  if (!name) return { error: "Name is required" };
  if (!category) return { error: "Category is required" };
  if (!company) return { error: "Company is required" };
  if (!photo || photo.size > 1000000) return { error: "Photo is required and should be less than 1MB" };
  return null;
};

// Create brand
const createBrandController = async (req, res) => {
  try {
      const validationError = validateBrandFields(req.fields, req.files);
      if (validationError) return res.status(400).send(validationError);

      const { name } = req.fields;
      const { photo } = req.files;
      const existingBrand = await brandModel.findOne({ name });
      if (existingBrand) {
        return res.status(200).send({
          success: false,
          message: "Brand Already Exists",
        });
      }
      const brand = new brandModel({ ...req.fields, slug: slugify(name) });

      if (photo) {
        brand.photo.data = fs.readFileSync(photo.path);
        brand.photo.contentType = photo.type;
      }

      await brand.save();
      res.status(201).send({
        success: true,
        message: 'Brand created successfully',
        brand,
      });
  } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: 'Error creating brand',
        error,
      });
  }
};

// Update brand
const updateBrandController = async (req, res) => {
  try {
      const validationError = validateBrandFields(req.fields, req.files);
      if (validationError) return res.status(400).send(validationError);

      const { name } = req.fields;
      const { photo } = req.files;
      const brand = await brandModel.findByIdAndUpdate(
          req.params.id,
          { ...req.fields, slug: slugify(name) },
          { new: true }
      );

      if (photo) {
        brand.photo.data = fs.readFileSync(photo.path);
        brand.photo.contentType = photo.type;
      }

      await brand.save();
      res.status(200).send({
        success: true,
        message: 'Brand updated successfully',
        brand,
      });
  } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: 'Error updating brand',
        error,
      });
  }
};

// Get all brands
const brandController = async (req, res) => {
  try {
    const brands = await brandModel.find({})
      .select("-photo")
      .populate("category")
      .populate('company');
    res.status(200).send({
      success: true,
      message: "All Brands List",
      brands,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all brands",
    });
  }
};

// Get single brand
const singleBrandController = async (req, res) => {
  try {
    const brand = await brandModel.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category")
      .populate('company');
    res.status(200).send({
      success: true,
      message: "Get Single Brand Successfully",
      brand,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single brand",
    });
  }
};

// Delete brand
const deleteBrandController = async (req, res) => {
  try {
    const { id } = req.params;
    await brandModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting brand",
      error,
    });
  }
};

// Get brand photo URL
const getBrandPhotourlController = async (req, res) => {
  try {
      const photoURL = await brandModel.findById(req.params.id).select("photo");
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

module.exports = {
  createBrandController,
  updateBrandController,
  brandController,
  singleBrandController,
  deleteBrandController,
  getBrandPhotourlController,
};

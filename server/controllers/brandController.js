import brandModel from "../models/brandModel.js";
import slugify from "slugify";
import fs from 'fs';

const validateBrandFields = (fields, files) => {
  const { name} = fields;
  const { photo } = files;
  if (!name) return { error: "Name is required" };
  if (!photo || photo.size > 1000000) return { error: "Photo is required and should be less than 1MB" };
  return null;
};

//create brand
export const createBrandController = async (req, res) => {
  try {
      const validationError = validateBrandFields(req.fields, req.files);
      if (validationError) return res.status(400).send(validationError);

      const { name } = req.fields;
      const { photo } = req.files;
      const existingBrand = await brandModel.findOne({ name });
        if (existingBrand) {
          return res.status(200).send({
            success: false,
            message: "Brand Already Exisits",
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
          message: 'brand created successfully',
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
    

//update brand
export const updateBrandController = async (req, res) => {
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
          message: 'brand updated successfully',
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

// get all brand
export const brandController = async (req, res) => {
  try {
    const brand = await brandModel.find({}).select("-photo");
    res.status(200).send({
      success: true,
      message: "All Brands List",
      brand,
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

// single brand
export const singleBrandController = async (req, res) => {
  try {
    const brand = await brandModel.findOne({ slug: req.params.slug }).select("-photo");
    res.status(200).send({
      success: true,
      message: "Get SIngle Brand SUccessfully",
      brand,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Brand",
    });
  }
};

//delete brand
export const deleteBrandController = async (req, res) => {
  try {
    const { id } = req.params;
    await brandModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Brand Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting brand",
      error,
    });
  }
};

//photo url
export const getBrandPhotourlController = async(req, res) => {
  try {
      const photoURL = await brandModel.findById(req.params.id).select("photo");
      if(photoURL.photo.data) {
          res.set("Content-type", photoURL.photo.contentType);
          return res.status(200).send(photoURL.photo.data);
      }
  } catch (error) {
      console.log(error);
      res.status(500).send({
          success:false,
          message:"There was an error in getting the photo url ",
          error,
      })
  }
};
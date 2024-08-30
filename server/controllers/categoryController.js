import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import fs from 'fs';

const validateCategoryFields = (fields, files) => {
  const { name} = fields;
  const { photo } = files;
  if (!name) return { error: "Name is required" };
  if (!photo || photo.size > 1000000) return { error: "Photo is required and should be less than 1MB" };
  return null;
};

//create category
export const createCategoryController = async (req, res) => {
  try {
      const validationError = validateCategoryFields(req.fields, req.files);
      if (validationError) return res.status(400).send(validationError);

      const { name } = req.fields;
      const { photo } = req.files;
      const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
          return res.status(200).send({
            success: false,
            message: "Category Already Exisits",
          });
        }
      const category = new categoryModel({ ...req.fields, slug: slugify(name) });

      if (photo) {
          category.photo.data = fs.readFileSync(photo.path);
          category.photo.contentType = photo.type;
      }

      await category.save();
      res.status(201).send({
          success: true,
          message: 'category created successfully',
          category,
      });
  } catch (error) {
      console.error(error);
      res.status(500).send({
          success: false,
          message: 'Error creating category',
          error,
      });
  }
};
    

//update category
export const updateCategoryController = async (req, res) => {
  try {
      const validationError = validateCategoryFields(req.fields, req.files);
      if (validationError) return res.status(400).send(validationError);

      const { name } = req.fields;
      const { photo } = req.files;
      const category = await categoryModel.findByIdAndUpdate(
          req.params.id,
          { ...req.fields, slug: slugify(name) },
          { new: true }
      );

      if (photo) {
          category.photo.data = fs.readFileSync(photo.path);
          category.photo.contentType = photo.type;
      }

      await category.save();
      res.status(200).send({
          success: true,
          message: 'category updated successfully',
          category,
      });
  } catch (error) {
      console.error(error);
      res.status(500).send({
          success: false,
          message: 'Error updating category',
          error,
      });
  }
};

// get all cat
export const categoryControlller = async (req, res) => {
  try {
    const category = await categoryModel.find({}).select("-photo");
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

// single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug }).select("-photo");
    res.status(200).send({
      success: true,
      message: "Get SIngle Category SUccessfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};

//delete category
export const deleteCategoryCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
};

//photo url
export const getCategoryPhotourlController = async(req, res) => {
  try {
      const photoURL = await categoryModel.findById(req.params.id).select("photo");
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
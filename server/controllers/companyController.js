import companyModel from "../models/companyModel.js";
import slugify from "slugify";
import fs from 'fs';

const validateCompanyFields = (fields, files) => {
  const { name, category} = fields;
  const { photo } = files;
  if (!name) return { error: "Name is required" };
  if (!category) return { error: "Category is required" };
  if (!photo || photo.size > 1000000) return { error: "Photo is required and should be less than 1MB" };
  return null;
};

//create company
export const createCompanyController = async (req, res) => {
  try {
      const validationError = validateCompanyFields(req.fields, req.files);
      if (validationError) return res.status(400).send(validationError);

      const { name } = req.fields;
      const { photo } = req.files;
      const existingCompany = await companyModel.findOne({ name });
        if (existingCompany) {
          return res.status(200).send({
            success: false,
            message: "Company Already Exisits",
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
          message: 'company created successfully',
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
    

//update company
export const updateCompanyController = async (req, res) => {
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
          message: 'company updated successfully',
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

// get all cat
export const companyController = async (req, res) => {
  try {
    const company = await companyModel.find({}).select("-photo").populate("category");
    res.status(200).send({
      success: true,
      message: "All Companies List",
      company,
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

// single company
export const singleCompanyController = async (req, res) => {
  try {
    const company = await companyModel.findOne({ slug: req.params.slug }).select("-photo").populate("category");
    res.status(200).send({
      success: true,
      message: "Get SIngle Company SUccessfully",
      company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Company",
    });
  }
};

//delete company
export const deleteCompanyController = async (req, res) => {
  try {
    const { id } = req.params;
    await companyModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting company",
      error,
    });
  }
};

//photo url
export const getCompanyPhotourlController = async(req, res) => {
  try {
      const photoURL = await companyModel.findById(req.params.id).select("photo");
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
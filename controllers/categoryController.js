import categoryModel from "../models/categoryModel.js";
import slugify from 'slugify';
import fs from "fs";

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.fields;
        const { photo } = req.files;

        // Validation
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }
        if (photo && photo.size > 1000000) {
            return res.status(400).json({ error: "Photo is required and should be less than 1MB" });
        }

        const category = new categoryModel({
            ...req.fields,
            slug: slugify(name)
        });

        if (photo) {
            category.photo.data = fs.readFileSync(photo.path);
            category.photo.contentType = photo.type;
        }

        await category.save();

        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            category,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'There was an error in creating a category',
            error,
        });
    }
};

// Update category
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.fields;
        const { photo } = req.files;

        // Validation
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }
        if (photo && photo.size > 1000000) {
            return res.status(400).json({ error: "Photo is required and should be less than 1MB" });
        }

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

        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            category,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'There was an error in updating the category',
            error,
        });
    }
};

// Get all categories
export const getCategoriesController = async (req, res) => {
    try {
        const categories = await categoryModel.find({}).select("-photo").limit(100).sort({ createdAt: -1 });

        res.status(200).json({
            totalCategories: categories.length,
            success: true,
            message: "Categories retrieved successfully",
            categories,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "There was an error in retrieving categories",
            error,
        });
    }
};

// Get category by slug
export const getCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug }).select("-photo");

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Category retrieved successfully",
            category,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "There was an error in retrieving the category",
            error,
        });
    }
};

// Find category by ID
export const searchCategoryIDController = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id).select("-photo");

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Category details retrieved successfully",
            category,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "There was an error in retrieving the category",
            error,
        });
    }
};

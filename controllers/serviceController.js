import serviceModel from '../models/serviceModel.js';
import slugify from 'slugify';
import fs from "fs";

const validateServiceFields = (fields, files) => {
    const { name, description, price, duration } = fields;
    const { photo } = files;
    if (!name) return { error: "Name is required" };
    if (!description) return { error: "Description is required" };
    if (!price) return { error: "Price is required" };
    if (!duration) return { error: "duration is required" };
    if (!photo) return { error: "Photo is required and should be less than 1MB" };
    return null;
};
// Create service
export const createServiceController = async (req, res) => {
    try {
        const validationError = validateServiceFields(req.fields, req.files);
        if (validationError) return res.status(400).send(validationError);

        const { name } = req.fields;
        const { photo } = req.files;
        const service = new serviceModel({ ...req.fields, slug: slugify(name) });

        if (photo) {
            service.photo.data = fs.readFileSync(photo.path);
            service.photo.contentType = photo.type;
        }

        await service.save();
        res.status(201).send({
            success: true,
            message: 'service created successfully',
            service,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error creating service',
            error,
        });
    }
};

// Update service
export const updateServiceController = async (req, res) => {
    try {
        const validationError = validateServiceFields(req.fields, req.files);
        if (validationError) return res.status(400).send(validationError);

        const { name } = req.fields;
        const { photo } = req.files;
        const service = await serviceModel.findByIdAndUpdate(
            req.params.id,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );

        if (photo) {
            service.photo.data = fs.readFileSync(photo.path);
            service.photo.contentType = photo.type;
        }

        await service.save();
        res.status(200).send({
            success: true,
            message: 'service updated successfully',
            service,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error updating service',
            error,
        });
    }
};

// Get all services
export const getServicesController = async (req, res) => {
    try {
        const services = await serviceModel.find({})
            .select("-photo")
            .limit(100)
            .sort({ createdAt: -1 });

        res.status(200).send({
            totalservices: services.length,
            success: true,
            message: "services retrieved successfully",
            services,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error retrieving services",
            error,
        });
    }
};


// single service
export const singleServiceController = async (req, res) => {
    try {
        const service = await serviceModel.findOne({ slug: req.params.slug })
            .select("-photo");

        if (!service) {
            return res.status(404).send({
                success: false,
                message: "service not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "service details retrieved successfully",
            service,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error retrieving service details",
            error,
        });
    }
};

// Delete service
export const deleteServiceController = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const result = await serviceModel.findByIdAndDelete(serviceId);

        if (!result) {
            return res.status(404).json({ success: false, message: 'service not found' });
        }

        res.json({ success: true, message: 'service deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

//photo url
export const getServicePhotourlController = async(req, res) => {
    try {
        const photoURL = await serviceModel.findById(req.params.id).select("photo");
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
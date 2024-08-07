import serviceModel from '../models/serviceModel.js';
import slugify from 'slugify';

// Create service
export const createServiceController = async (req, res) => {
    try {
        const { name, description, price, duration } = req.body;
        
        // Validation
        if (!name || !description || !price || !duration) {
            return res.status(400).send({ error: "All fields are required" });
        }
        
        const service = new serviceModel({ name, description, price, duration, slug: slugify(name) });
        await service.save();
        
        res.status(201).send({
            success: true,
            message: 'Service created successfully',
            service,
        });
    } catch (error) {
        console.log(error);
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
        const { id } = req.params;
        const { name, description, price, duration, status } = req.body;
        
        const service = await serviceModel.findByIdAndUpdate(
            id,
            { name, description, price, duration, status, slug: slugify(name) },
            { new: true }
        );
        
        if (!service) {
            return res.status(404).send({
                success: false,
                message: 'Service not found',
            });
        }
        
        res.status(200).send({
            success: true,
            message: 'Service updated successfully',
            service,
        });
    } catch (error) {
        console.log(error);
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
        const service = await serviceModel.find({});
        res.status(200).send({
            success: true,
            message: 'Services retrieved successfully',
            service,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error retrieving services',
            error,
        });
    }
};


// single service
export const singleServiceController = async (req, res) => {
    try {
      const service = await serviceModel.findOne({ slug: req.params.slug });
      res.status(200).send({
        success: true,
        message: "Get Single service SUccessfully",
        service,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While getting Single service",
      });
    }
  };

// Delete service
export const deleteServiceController = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await serviceModel.findByIdAndDelete(id);
        
        if (!service) {
            return res.status(404).send({
                success: false,
                message: 'Service not found',
            });
        }
        
        res.status(200).send({
            success: true,
            message: 'Service deleted successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error deleting service',
            error,
        });
    }
};

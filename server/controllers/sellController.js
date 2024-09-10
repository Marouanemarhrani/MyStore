const sellModel = require('../models/sellModel');
const fs = require('fs');

// Validation des champs
const validateSellFields = (fields, files) => {
  const { deviceName, estimatedPrice, phoneNumber, userOffer } = fields;
  const { photo } = files;

  if (!deviceName) return { error: "Device name is required" };
  if (!estimatedPrice || isNaN(estimatedPrice)) return { error: "Valid estimated price is required" };
  if (!phoneNumber) return { error: "Phone number is required" };
  if (!userOffer || isNaN(userOffer)) return { error: "Valid user offer is required" };
  if (!photo || photo.size > 1000000) return { error: "Photo is required and should be less than 1MB" };

  return null;
};

// Create sell controller
const createSellController = async (req, res) => {
  try {
    const validationError = validateSellFields(req.fields, req.files);
    if (validationError) return res.status(400).send(validationError);

    const { photo } = req.files;
    const sell = new sellModel({ ...req.fields });

    if (photo) {
      sell.photo = {
        data: fs.readFileSync(photo.path),
        contentType: photo.type,
      };
    }

    await sell.save();
    res.status(201).send({
      success: true,
      message: 'Sell created successfully',
      sell,
    });
  } catch (error) {
    console.error("Error in createSellController:", error);
    res.status(500).send({
      success: false,
      message: 'Error creating sell',
      error: error.message,
    });
  }
};

// Update sell
const updateSellController = async (req, res) => {
  try {
    const validationError = validateSellFields(req.fields, req.files);
    if (validationError) return res.status(400).send(validationError);

    const { photo } = req.files;
    const sell = await sellModel.findByIdAndUpdate(req.params.id, { ...req.fields }, { new: true });

    if (photo) {
      sell.photo = {
        data: fs.readFileSync(photo.path),
        contentType: photo.type,
      };
    }

    await sell.save();
    res.status(200).send({
      success: true,
      message: 'Sell updated successfully',
      sell,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error updating sell',
      error: error.message,
    });
  }
};

// Get all sells
const sellController = async (req, res) => {
  try {
    const sells = await sellModel.find({}).select("-photo");
    res.status(200).send({
      success: true,
      message: "All sells retrieved successfully",
      sells,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error retrieving sells",
      error: error.message,
    });
  }
};

// Get single sell
const singleSellController = async (req, res) => {
  try {
    const { id } = req.params;
    const sell = await sellModel.findById(id).select("-photo");

    if (!sell) {
      return res.status(404).send({
        success: false,
        message: "Sell not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Single sell retrieved successfully",
      sell,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error retrieving sell",
      error: error.message,
    });
  }
};

// Delete sell
const deleteSellController = async (req, res) => {
  try {
    const { id } = req.params;
    const sell = await sellModel.findByIdAndDelete(id);

    if (!sell) {
      return res.status(404).send({
        success: false,
        message: "Sell not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Sell deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting sell",
      error: error.message,
    });
  }
};

// Get sell photo URL
const getSellPhotourlController = async (req, res) => {
  try {
    const photoURL = await sellModel.findById(req.params.id).select("photo");

    if (!photoURL || !photoURL.photo.data) {
      return res.status(404).send({
        success: false,
        message: "Photo not found",
      });
    }

    res.set("Content-Type", photoURL.photo.contentType);
    return res.status(200).send(photoURL.photo.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error retrieving photo URL",
      error: error.message,
    });
  }
};

module.exports = {
  createSellController,
  updateSellController,
  sellController,
  singleSellController,
  deleteSellController,
  getSellPhotourlController,
};

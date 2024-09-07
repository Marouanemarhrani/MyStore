const appointmentModel = require('../models/appointmentModel');

// Create appointment
const createAppointmentController = async (req, res) => {
    try {
        const { firstname, lastname, email, date, time, phone, description } = req.body;

        const appointment = new appointmentModel({
            firstname,
            lastname, 
            date,
            time,
            email,
            phone,
            description,
        });

        await appointment.save();
        res.status(201).send({
            success: true,
            message: 'Appointment created successfully',
            appointment,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error creating appointment',
            error,
        });
    }
};

// Update appointment
const updateAppointmentController = async (req, res) => {
    try {
      const { firstname, lastname, email, date, time, phone, description, status } = req.body;
      const { id } = req.params;
      const appointment = await appointmentModel.findByIdAndUpdate(
        id,
        { firstname, lastname, email, date, time, phone, description, status },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Appointment Updated Successfully",
        appointment,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while updating appointment",
      });
    }
};

// Get all appointments
const getAppointmentsController = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        res.status(200).send({
            success: true,
            message: 'Appointments retrieved successfully',
            appointments,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error retrieving appointments',
            error,
        });
    }
};

// Single appointment
const singleAppointmentController = async (req, res) => {
    try {
      const appointment = await appointmentModel.findOne({ lastname: req.params.lastname, firstname: req.params.firstname });
      res.status(200).send({
        success: true,
        message: "Get Single Appointment Successfully",
        appointment,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While getting Single Appointment",
      });
    }
};

// Get appointment by ID
const getAppointmentController = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await appointmentModel.findById(id);

        if (!appointment) {
            return res.status(404).send({
                success: false,
                message: 'Appointment not found',
            });
        }

        res.status(200).send({
            success: true,
            message: 'Appointment retrieved successfully',
            appointment,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error retrieving appointment',
            error,
        });
    }
};

// Delete appointment
const deleteAppointmentController = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await appointmentModel.findByIdAndDelete(id);

        if (!appointment) {
            return res.status(404).send({
                success: false,
                message: 'Appointment not found',
            });
        }

        res.status(200).send({
            success: true,
            message: 'Appointment deleted successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error deleting appointment',
            error,
        });
    }
};

module.exports = {
    createAppointmentController,
    updateAppointmentController,
    getAppointmentsController,
    singleAppointmentController,
    getAppointmentController,
    deleteAppointmentController,
};

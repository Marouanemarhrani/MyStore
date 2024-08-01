import appointmentModel from '../models/appointmentModel.js';
import slugify from 'slugify';

// Create appointment
export const createAppointmentController = async (req, res) => {
    try {
        const { client, date, time, description } = req.body;

        const appointment = new appointmentModel({
            client,
            date,
            time,
            description,
            slug: slugify(client),
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
export const updateAppointmentController = async (req, res) => {
    try {
      const { client, date, time, description } = req.body;
      const { id } = req.params;
      const appointment = await appointmentModel.findByIdAndUpdate(
        id,
        { client, date, time, description, slug: slugify(client) },
        { new: true }
      );
      res.status(200).send({
        success: true,
        messsage: "Appointments Updated Successfully",
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
export const getAppointmentsController = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
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

// single appointment
export const singleAppointmentController = async (req, res) => {
    try {
      const appointment = await appointmentModel.findOne({ slug: req.params.slug });
      res.status(200).send({
        success: true,
        message: "Get SIngle Appoitnment SUccessfully",
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
export const getAppointmentController = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await appointmentModel.findById(id)

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
export const deleteAppointmentController = async (req, res) => {
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

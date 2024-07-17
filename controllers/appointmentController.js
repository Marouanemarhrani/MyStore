import appointmentModel from '../models/appointmentModel.js';

// Create appointment
export const createAppointmentController = async (req, res) => {
    try {
        const { client, date, time, description } = req.body;
        const technician = req.user._id; // Assuming the technician is the logged-in user

        const appointment = new appointmentModel({
            technician,
            client,
            date,
            time,
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
export const updateAppointmentController = async (req, res) => {
    try {
        const { id } = req.params;
        const { client, date, time, status, description } = req.body;

        // Prepare the updated fields
        const updatedFields = {};
        if (client) updatedFields.client = client;
        if (date) updatedFields.date = new Date(date);  // Convert date to Date object
        if (time) updatedFields.time = time;  // Assuming time is in HH:MM format
        if (status) updatedFields.status = status;
        if (description) updatedFields.description = description;

        // Find and update the appointment
        const appointment = await appointmentModel.findByIdAndUpdate(
            id,
            updatedFields,
            { new: true }
        );

        if (!appointment) {
            return res.status(404).send({
                success: false,
                message: 'Appointment not found',
            });
        }

        res.status(200).send({
            success: true,
            message: 'Appointment updated successfully',
            appointment,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error updating appointment',
            error,
        });
    }
};


// Get all appointments
export const getAppointmentsController = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
            .populate('technician', 'name')
            .populate('client', 'name');
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

// Get appointment by ID
export const getAppointmentController = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await appointmentModel.findById(id)
            .populate('technician', 'name')
            .populate('client', 'name');

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

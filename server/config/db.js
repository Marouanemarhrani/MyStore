const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
        throw new Error('MongoDB connection string is not defined in environment variables.');
    }

    try {
        // Connect to MongoDB
        const connection = await mongoose.connect(mongoUrl, {
            // Removed deprecated options
        });
        console.log(`Database connected successfully: ${connection.connection.host}`);
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        process.exit(1); // Optional: exit the process with failure code if connection fails
    }
};

module.exports = connectDB;

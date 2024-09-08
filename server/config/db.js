const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUrl = process.env.NODE_ENV === 'test'
    ? process.env.MONGO_TEST_URL  // Use test-specific database
    : process.env.MONGO_URL;      // Use regular database in development

  if (!mongoUrl) {
    throw new Error('MongoDB connection string is not defined in environment variables.');
  }

  try {
    const connection = await mongoose.connect(mongoUrl);
    console.log(`Database connected successfully: ${connection.connection.host}`);
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

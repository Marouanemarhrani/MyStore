import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

// Import routes
import userRoute from './routes/userRoute.js';

// Configure environment variables
dotenv.config();

// Connect to the database
connectDB();

// Create Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Route handling
app.use('/api/users', userRoute);

// Define port
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

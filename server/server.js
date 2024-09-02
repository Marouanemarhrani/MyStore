import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

// Import routes
import userRoute from './routes/userRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import productRoute from './routes/productRoute.js';
import appointmentRoute from './routes/appointmentRoute.js';
import serviceRoute from './routes/serviceRoute.js';
import brandRoute from './routes/brandRoute.js';

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
app.use('/api/categories', categoryRoute);
app.use('/api/products', productRoute);
app.use('/api/appointments', appointmentRoute);
app.use('/api/services', serviceRoute);
app.use('/api/brands', brandRoute);

// Define port
const PORT = process.env.PORT || 8080;

app.use(express.static("./client/build")); 

// Start server
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

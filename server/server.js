import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import userRoute from './routes/userRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import productRoute from './routes/productRoute.js';
import appointmentRoute from './routes/appointmentRoute.js';
import serviceRoute from './routes/serviceRoute.js';
import brandRoute from './routes/brandRoute.js';
import companyRoute from './routes/companyRoute.js';

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

//Setup __dirname in ES Module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
// Route handling
app.use('/api/users', userRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/products', productRoute);
app.use('/api/appointments', appointmentRoute);
app.use('/api/services', serviceRoute);
app.use('/api/brands', brandRoute);
app.use('/api/companies', companyRoute);

//Handle all other routes and return the React app
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});
// Define port
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

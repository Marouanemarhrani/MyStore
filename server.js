import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";

//RoutesImports
import userRoute from "./routes/userRoute.js";

//configure env
dotenv.config();

//database connection
connectDB();

//rest object 
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/users", userRoute);

//port 
const PORT = process.env.PORT || 8080;
 
//run listen 

app.listen(PORT, () => {
    console.log(`server is running on developpement mode on port ${PORT}`);
});
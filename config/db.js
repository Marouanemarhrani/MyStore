import mongoose from "mongoose";

const connectDB = async () => {
     try {
        const connection= await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database ${connection.connection.host} connected successfully`);
     } catch (error) {
        console.log (`Error while connecting to database ${error}`);
     }
};

export default connectDB;
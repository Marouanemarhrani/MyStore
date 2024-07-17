import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
        slug: {
            type: String,
            lowercase: true,
            unique: true,
            index: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Category", categorySchema);

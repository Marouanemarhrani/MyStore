import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
},
category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
},
  photo: {
    data: Buffer,
    contentType: String
},
});

export default mongoose.model("Brand", brandSchema);
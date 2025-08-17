import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, 
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"], 
    },
    password: {
      type: String,
      required: true,
      minlength: 6, 
    },
 
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model("Admin", AdminSchema);

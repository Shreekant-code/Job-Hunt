// models/Job.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
  },
  Skill: {
    type: [String],
    
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String], 
    default: [],
  },
  salary: {
    type: String,
  },
 
  
});


const Job = mongoose.model("Job", jobSchema);

export default Job;

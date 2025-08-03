import mongoose from "mongoose";
import Job from "../../model.js";



export const CreateJobPost=async(req,res)=>{
    try {
const { title, company, location, Skill, description, requirements ,salary } = req.body;

if (!title || !company || !location || !Skill || !description || !requirements|| !salary) {
  return res.status(400).json({ error: "All fields are required" });
}
    const job = new Job({
      title,
      company,
      location,
      Skill,
       requirements,
      description,
      salary,
    
    });
    await job.save();

        res.status(200).json({message:"Create Job Post successfully"});

        
    } catch (error) {
       res.status(500).json({ message:error.message });
    }
}


// get all job post


export const getAllJob=async(req,res)=>{
    try {
       const jobs= await Job.find({})
        res.status(200).json(jobs);
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}


export const getJobbyId=async(req,res)=>{
    try {
        const{id}=req.params;
        const getdata= await Job.findById(id);
        res.status(200).json(getdata)
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}


export const updatebyId=async(req,res)=>{
    try {
const {id}=req.params;
const updated=req.body;
if(!updated){
    res.status(400).json({message:"Unable to find Post"})
}
        
      await Job.findByIdAndUpdate(id, updated, { new: true });
        res.status(200).json({message:"updated succesfuly"})
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}


export const deleteById=async(req,res)=>{
    try {
        const {id}=req.params;
        await Job.findByIdAndDelete(id);
        res.status(200).json({message:"deleted successfully"})
        
    } catch (error) {
        res.status(500).json({message:error.mes})
        
    }
}






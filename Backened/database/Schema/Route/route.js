import express from "express"
import { CreateJobPost, deleteById, getAllJob ,getJobbyId, updatebyId} from "./operatins/operation.js";

const route=express.Router();


route.post("/jobs", CreateJobPost);             
route.get("/jobs", getAllJob);                   
route.get("/jobs/:id", getJobbyId);              
route.put("/jobs/:id", updatebyId);              
route.delete("/jobs/:id", deleteById);           



export default route;
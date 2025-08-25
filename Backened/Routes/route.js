import express from "express";
import { LoginAdmin, Registeradmin } from "../operations/operationadmin.js";
import { Loginuser, Registeruser } from "../operations/operationuser.js";
import { adminAuth, userAuth } from "../middleware/authenticate.js";
import { 
  Createjob, 
  deleteJobById, 
  getJob, 
  getJobById,
  updateJobById ,getAdminJobs
} from "../operations/adminwork.js";

import { applyJob } from "../operations/operationuser.js";


 

const router = express.Router();

// Admin routes
router.post("/admin", Registeradmin);
router.post("/adminlogin", LoginAdmin);

// User routes
router.post("/registeruser", Registeruser);
router.post("/loginuser", Loginuser);

// Job routes
router.post("/create",adminAuth, Createjob);
router.put("/jobsUpdate/:id",adminAuth, updateJobById);
router.delete("/deletejob/:id",adminAuth, deleteJobById);

// Get jobs

router.get("/jobs",userAuth, getJob);
router.get("/jobs/:id",adminAuth, getJobById);

router.get("/my-jobs", adminAuth, getAdminJobs);
router.post("/:jobId/apply", userAuth, applyJob);


export default router;

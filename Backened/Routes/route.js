import express from "express";
import { LoginAdmin, Registeradmin } from "../operations/operationadmin.js";
import { Loginuser, Registeruser } from "../operations/operationuser.js";
import { authenticate, authorize } from "../middleware/authenticate.js";

import { 
  Createjob, 
  deleteJobById, 
  getJob, 
  getJobByid, 
  updateJobById 
} from "../operations/adminwork.js";

 

const router = express.Router();

// Admin routes
router.post("/admin", Registeradmin);
router.post("/adminlogin", LoginAdmin);

// User routes
router.post("/jobseeker", Registeruser);
router.post("/loginuser", Loginuser);

// Job routes
router.post("/create", authenticate, authorize(["admin"]), Createjob);
router.put("/jobsUpdate/:id", authenticate, authorize(["admin"]), updateJobById);
router.delete("/deletejob/:id", authenticate, authorize(["admin"]), deleteJobById);

// Get jobs

router.get("/jobs", authenticate, getJob);
router.get("/jobs/:id", authenticate, getJobByid);
router.get("/myjobs/:id", authenticate, authorize(["admin"]), getJob);


export default router;

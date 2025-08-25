import express from "express";
const jobroute=express.Router();
import { getApplicantsByJob } from "../operations/operationadmin.js";

import { adminAuth } from "../middleware/authenticate.js";

 jobroute.get("/applicants/:jobId", adminAuth, getApplicantsByJob);


 export default jobroute;

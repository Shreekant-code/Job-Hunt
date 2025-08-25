import Jobschema from "../Schema/JobSchema.js";

export const Createjob = async (req, res) => {
  try {
    const { title, company, location, salary, jobType, createdAt, skills, description, lastDate } = req.body;

    if (!title || !company || !location || !salary || !jobType || !skills || !description || !lastDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const createNew = new Jobschema({
      title,
      company,
      location,
      salary,
      jobType,
      skills,
      description,
      createdAt,
      lastDate,
      admin: req.admin._id 
    });

    await createNew.save();
    res.status(200).json({ message: "Job created", job: createNew });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getJob = async (req, res) => {
  try {
    const jobs = await Jobschema.find().sort({ createdAt: -1 }); 
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.admin._id;

    if (!id) return res.status(400).json({ message: "Job ID is required" });

    const job = await Jobschema.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.admin.toString() !== adminId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.admin._id;

    const job = await Jobschema.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.admin.toString() !== adminId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { title, company, location, salary, jobType, createdAt, skills, description, lastDate } = req.body;
    Object.assign(job, { title, company, location, salary, jobType, createdAt, skills, description, lastDate });
    await job.save();

    res.status(200).json({ message: "Job updated successfully", job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.admin._id;

    const job = await Jobschema.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.admin.toString() !== adminId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Jobschema.findByIdAndDelete(id);

    res.status(200).json({ message: "Job deleted successfully", job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAdminJobs = async (req, res) => {
  try {
    const jobs = await Jobschema.find({ admin: req.admin._id });
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

import JobSchema from "../Schema/jobSchema.js"; 

export const getJob = async (req, res) => {
  try {
    let jobs;

    if (req.role === "admin") {
    
      jobs = await JobSchema.find({ admin: req.user._id }).sort({ createdAt: -1 });
    } else {
    
      jobs = await JobSchema.find().sort({ createdAt: -1 });
    }

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

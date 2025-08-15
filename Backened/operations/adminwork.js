import Jobchema from "../Schema/Jobchema.js";

export const Createjob=async(req,res)=>{
    try {


      const { title, company, location, salary, jobType,createdAt, skills, description, lastDate } = req.body;


if (!title || !company || !location || !salary || !jobType || !skills || !description || !lastDate) {
    return res.status(400).json({ message: "All fields are required" });
}
        const createNew= new Jobchema({
            title,company,location,salary,jobType,skills,description,createdAt,lastDate

        })
        await createNew.save();
        res.status(200).json({message:"Job created"})


    
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}


export const getJob = async (req, res) => {
  try {

    const jobs = await Jobchema.find().sort({ createdAt: -1 }); 

    if (!Jobchema || Jobchema.length === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }

    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getJobByid = async (req, res) => {
  try {
    const { id } = req.params; 
    if (!id) return res.status(400).json({ message: "Job ID is required" });

    const jobfind = await Jobchema.findById(id); 
    if (!jobfind) return res.status(404).json({ message: "Job not found" });

    res.status(200).json({ jobfind });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, company, location, salary, jobType, createdAt, skills, description, lastDate } = req.body;

        const updatedJob = await Jobchema.findByIdAndUpdate(
            id, 
            { title, company, location, salary, jobType, createdAt, skills, description, lastDate }, 
           
        );

        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({ updatedJob });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export const deleteJobById = async (req, res) => {
    try {
        const { id } = req.params;

       
        const deletedJob = await Jobchema.findByIdAndDelete(id);

        if (!deletedJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({ message: "Job deleted successfully", deletedJob });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

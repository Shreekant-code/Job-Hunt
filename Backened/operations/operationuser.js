import userschema from "../Schema/userschema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import JobSchema from "../Schema/JobSchema.js";
export const Registeruser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existadmin = await userschema.findOne({ email });
    if (existadmin) {
      return res.status(401).json({ message: "Email Already Used" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newRegister = new userschema({ name, email, password: hashedPassword });
    await newRegister.save();

    res.status(201).json({ 
      message: " user registered successfully", 
      email, 
      name ,
      password:hashedPassword
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const Loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existuser = await userschema.findOne({ email });
    if (!existuser) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const isPasswordValid = await bcrypt.compare(password, existuser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

     const token = jwt.sign(
      { id: existuser._id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    
 
  
  

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: existuser._id,
        name: existuser.name,
        email: existuser.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user._id; // from userAuth middleware

    const job = await JobSchema.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Use some() with toString to compare ObjectId
    if (job.applicants.some(app => app.toString() === userId.toString())) {
      return res.status(400).json({ message: "You already applied to this job" });
    }

    job.applicants.push(userId);
    await job.save();

    res.status(200).json({ message: "Applied successfully", job });
  } catch (error) {
    console.error("Apply Job Error:", error);
    res.status(500).json({ message: error.message });
  }
};


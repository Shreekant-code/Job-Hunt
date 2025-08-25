import Admin from "../Schema/adminschema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Job from "../Schema/JobSchema.js"; // ✅ use Job instead of JobSchema for clarity

// ------------------ REGISTER ADMIN ------------------
export const Registeradmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existadmin = await Admin.findOne({ email });
    if (existadmin) {
      return res.status(401).json({ message: "Email Already Used" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newRegister = new Admin({ name, email, password: hashedPassword });
    await newRegister.save();

    res.status(201).json({ 
      message: "Admin registered successfully", 
      admin: {
        id: newRegister._id,
        name: newRegister.name,
        email: newRegister.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error while registering admin" });
  }
};


// ------------------ LOGIN ADMIN ------------------
export const LoginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existAdmin = await Admin.findOne({ email });
    if (!existAdmin) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const isPasswordValid = await bcrypt.compare(password, existAdmin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const token = jwt.sign(
      { id: existAdmin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ 
      message: "Login successful",
      token,
      admin: {
        id: existAdmin._id,
        name: existAdmin.name,
        email: existAdmin.email,
      }
    });
    
  } catch (error) {
    res.status(500).json({ message: "Server error while logging in" });
  }
};



export const getApplicantsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    console.log("Job ID from route:", jobId);

    // Validate jobId
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid Job ID" });
    }

    const adminId = req.admin._id; // from adminAuth middleware

    const job = await Job.findById(jobId)
      .populate("applicants", "name email resume")
      .populate("admin", "name email");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Safely check admin
    if (!job.admin || job.admin._id.toString() !== adminId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json({ 
      jobTitle: job.title,
      applicants: job.applicants 
    });
  } catch (error) {
    console.error("Error fetching applicants:", error.message);
    res.status(500).json({ message: "Server error while fetching applicants" });
  }
};

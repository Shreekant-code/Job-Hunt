import adminschema from "../Schema/adminschema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
export const Registeradmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existadmin = await adminschema.findOne({ email });
    if (existadmin) {
      return res.status(401).json({ message: "Email Already Used" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newRegister = new adminschema({ name, email, password: hashedPassword });
    await newRegister.save();

    res.status(201).json({ 
      message: "Admin registered successfully", 
      email, 
      name ,
      password:hashedPassword
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const LoginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existAdmin = await adminschema.findOne({ email });
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
    res.status(500).json({ message: error.message });
  }
};
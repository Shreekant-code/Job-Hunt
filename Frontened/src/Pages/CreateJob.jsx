import { useState } from "react";
import axios from "axios";
import "./Create.css";
import { useNavigate } from "react-router-dom";

export const CreateJob = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [Skill, setSkill] = useState(""); 
  const [requirements, setReq] = useState(""); 
  const [description, setDes] = useState("");
  const [salary, setSalary] = useState("");
const navigate=useNavigate();
 

  const handleCreateJob = async (e) => {
    e.preventDefault();

    try {
      const newpost = {
        title,
        company,
        location,
        Skill: Skill.split(",").map((s) => s.trim()),
        requirements: requirements.split(",").map((r) => r.trim()),
        description,
        salary,
       
      };

      const response = await axios.post("http://localhost:3000/jobs", newpost);
      console.log("Job created:", response.data);
      navigate("/");


      

      setTitle("");
      setCompany("");
      setLocation("");
      setSkill("");
      setReq("");
      setDes("");
      setSalary("");
    } catch (error) {
      console.error("Error creating job:", error.message);
      alert("Failed to create job");
    }
  };

  return (
    <div className="form-container">
      <h2>Create Job</h2>
      <form onSubmit={handleCreateJob}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Job Title"
          required
        />
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
          required
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          required
        />
        <input
          type="text"
          value={Skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="Skills (comma-separated)"
        />
        <input
          type="text"
          value={requirements}
          onChange={(e) => setReq(e.target.value)}
          placeholder="Requirements (comma-separated)"
        />
        <textarea
          value={description}
          onChange={(e) => setDes(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Salary"
        />
        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

export default CreateJob;

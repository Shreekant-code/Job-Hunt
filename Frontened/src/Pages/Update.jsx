import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const Update = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [Skill, setSkill] = useState("");
  const [requirements, setReq] = useState("");
  const [description, setDes] = useState("");
  const [salary, setSalary] = useState("");
 const navigate = useNavigate();

  const { id } = useParams();

  const getDataById = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/jobs/${id}`);
      const job = res.data;

      // Populate form fields
      setTitle(job.title || "");
      setCompany(job.company || "");
      setLocation(job.location || "");
      setSkill((job.Skill || []).join(", "));
      setReq((job.requirements || []).join(", "));
      setDes(job.description || "");
      setSalary(job.salary || "");
    } catch (error) {
      console.error("Error fetching job data:", error.message);
    }
  };

  useEffect(() => {
    getDataById();
  }, [id]);

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    try {
      const updatedJob = {
        title,
        company,
        location,
        Skill: Skill.split(",").map((s) => s.trim()),
        requirements: requirements.split(",").map((r) => r.trim()),
        description,
        salary,
      };

      await axios.put(`http://localhost:3000/jobs/${id}`, updatedJob);
      alert("Job updated successfully!");
      navigate("/")
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleUpdateJob}>
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
          required
        />
        <button type="submit">Save</button>
      </form>
    </>
  );
};

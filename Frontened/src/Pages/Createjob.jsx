// CreateJob.jsx
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Createjob.css";

export const CreateJob = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");
  const [lastDate, setLastDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken"); // get admin token
    if (!token) {
      toast.error("❌ You are not authorized. Please login.");
      return;
    }

    try {
      const payload = {
        title,
        company,
        location,
        salary,
        jobType,
        skills: skills.split(",").map((s) => s.trim()),
        description,
        lastDate,
      };

      const res = await axios.post("https://job-hunt-3-9hns.onrender.com/create", payload, {
        headers: {
          Authorization: `Bearer ${token}`, // include token
          "Content-Type": "application/json",
        },
      });

      console.log("Job Created:", res.data);
      toast.success("✅ Job created successfully!");

      // Reset form
      setTitle("");
      setCompany("");
      setLocation("");
      setSalary("");
      setJobType("Full-time");
      setSkills("");
      setDescription("");
      setLastDate("");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        toast.error("❌ Unauthorized! Please login again.");
      } else {
        toast.error("❌ Failed to create job. Try again!");
      }
    }
  };

  return (
    <div className="createjob-container">
      <div className="createjob-card">
        <h2 className="createjob-title">Create New Job</h2>

        <form onSubmit={handleSubmit} className="createjob-form">
          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Salary</label>
            <input
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Job Type</label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>
          </div>

          <div className="form-group">
            <label>Last Date</label>
            <input
              type="date"
              value={lastDate}
              onChange={(e) => setLastDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Skills (comma separated)</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div className="form-group full-width">
            <label>Job Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Create Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

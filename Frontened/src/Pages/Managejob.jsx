import { useEffect, useState } from "react";
import axios from "axios";
import {
  FiMapPin,
  FiDollarSign,
  FiClock,
  FiBriefcase,
  FiUsers,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useJobs } from "../components/JobContext"; // shared state
import "./Manage.css";

export const ManageJob = () => {
  const { jobs, setJobs } = useJobs(); // global state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteJobId, setDeleteJobId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const { setSelectedJobId } = useOutletContext(); // get setter from AdminDashboard

  // Fetch jobs for logged-in admin
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://job-hunt-3-9hns.onrender.com/my-jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data.jobs || []);
    } catch (err) {
      setError("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Delete job
  const handleDeleteById = async () => {
    try {
      await axios.delete(`https://job-hunt-3-9hns.onrender.com/deletejob/${deleteJobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs((prev) => prev.filter((job) => job._id !== deleteJobId));
      setDeleteJobId(null);
    } catch (err) {
      setError("Failed to delete job");
    }
  };

  // Navigate to applicants page
  const viewApplicants = (jobId) => {
    setSelectedJobId(jobId); // update selected job for sidebar
    navigate(`/admindashboard/jobs/applicants/${jobId}`);
  };

  return (
    <div className="manage-jobs-container">
      <h2>My Posted Jobs</h2>

      {loading && <p>Loading jobs...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && jobs.length === 0 && <p className="nojobs">No jobs posted yet.</p>}

      <div className="job-grid">
        {jobs.map((job) => (
          <div key={job._id} className="job-card">
            <h3>
              <BsFillBookmarkStarFill color="#ff6b6b" /> {job.title}
            </h3>
            <p>
              <FiBriefcase /> <strong>Company:</strong> {job.company}
            </p>
            <p>
              <FiMapPin /> <strong>Location:</strong> {job.location}
            </p>
            <p>
              <FiDollarSign /> <strong>Salary:</strong> {job.salary || "Not disclosed"}
            </p>
            <p>
              <FiClock /> <strong>Job Type:</strong> {job.jobType}
            </p>
            <p>
              <AiOutlineCalendar /> <strong>Last Date:</strong> {new Date(job.lastDate).toLocaleDateString()}
            </p>

            <p>
              <strong>Skills:</strong>
            </p>
            <div className="skills-container">
              {job.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>

            <p>
              <strong>Description:</strong> {job.description}
            </p>
            <p>
              <FiUsers /> <strong>Applicants:</strong> {job.applicants.length}
            </p>

            <div className="job-actions">
              <button className="view-btn" onClick={() => viewApplicants(job._id)}>
                <FiUsers /> View Applicants
              </button>
              <button className="edit-btn">
                <FiEdit /> Edit
              </button>
              <button className="delete-btn" onClick={() => setDeleteJobId(job._id)}>
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {deleteJobId && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Are you sure you want to delete this job?</h3>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setDeleteJobId(null)}>Cancel</button>
              <button className="confirm-btn" onClick={handleDeleteById}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

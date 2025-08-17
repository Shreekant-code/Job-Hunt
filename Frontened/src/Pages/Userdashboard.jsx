import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiMapPin, FiDollarSign, FiClock, FiBriefcase, FiCheckCircle, FiXCircle } from "react-icons/fi";
import "./userdashboard.css";

export const Userdashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  const [username, setUsername] = useState("");
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch username from localStorage
  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) setUsername(name);
  }, []);

  // Redirect if no token & fetch jobs
  useEffect(() => {
    if (!token) {
      navigate("/jobseeker", { replace: true });
      return;
    }

    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobData(res.data.jobs || []);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("userToken");
          localStorage.removeItem("userName");
          navigate("/jobseeker", { replace: true });
        } else {
          setError("Failed to load jobs. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [token, navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    navigate("/", { replace: true });
  };

  return (
    <>
      <header className="header-admin">
        <div className="admin-detail">
          <h1>Welcome {username || "User"}</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <section className="dashboard-container">
        <div className="dashboard-header">
          <h2 className="dashboard-title">🚀 Available Job Openings</h2>
        </div>

        {loading && <p>⏳ Loading jobs...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="job-grid">
          {!loading && !error && jobData.length === 0 && (
            <p>No job openings available right now.</p>
          )}

          {jobData.map((job) => {
            const isExpired = new Date(job.lastDate) < new Date();

            return (
              <div key={job._id} className="job-card">
                <h3 className="job-title">{job.title}</h3>
                <p className="job-company">
                  <FiBriefcase className="icon" /> {job.company}{" "}
                  <FiMapPin className="icon" /> {job.location}
                </p>
                <p className="job-salary">
                  <FiDollarSign className="icon" /> {job.salary || "Not disclosed"}
                </p>
                <span className="job-type">{job.jobType}</span>

                <div className="job-skills">
                  {(job.skills || []).map((skill, index) => (
                    <span key={index} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="job-desc">{job.description}</p>

                <p className="job-deadline">
                  <FiClock className="icon" /> Apply before:{" "}
                  {new Date(job.lastDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                <button
                  className={isExpired ? "apply-btn closed-btn" : "apply-btn"}
                  disabled={isExpired}
                  onClick={() =>
                    !isExpired &&
                    alert(`Applied to ${job.title} at ${job.company}`)
                  }
                >
                  {isExpired ? (
                    <>
                      <FiXCircle className="icon" /> Applications Closed
                    </>
                  ) : (
                    <>
                      <FiCheckCircle className="icon" /> Apply Now
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

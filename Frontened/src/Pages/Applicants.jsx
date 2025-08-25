import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FiMail, FiFileText, FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";
import "./Applicant.css"

export const Applicants = () => {
  const {jobId}=useParams();
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
console.log("Job ID from URL:", jobId);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/jobs/applicants/${jobId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res.data);

        setApplicants(res.data.applicants || []);
        setFilteredApplicants(res.data.applicants || []);
        setJobTitle(res.data.jobTitle || "Job Applicants");
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to fetch applicants");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId, token]);

  // Search filter
  useEffect(() => {
    if (!search) {
      setFilteredApplicants(applicants);
    } else {
      const lower = search.toLowerCase();
      setFilteredApplicants(
        applicants.filter(
          (a) =>
            a.name.toLowerCase().includes(lower) ||
            a.email.toLowerCase().includes(lower)
        )
      );
    }
  }, [search, applicants]);

  return (
    <div className="applicants-container">
      <h2 className="title">{jobTitle}</h2>
      <p className="total-count">
        Total Applicants: <span>{filteredApplicants.length}</span>
      </p>

      {/* 🔍 Search Bar */}
      <div className="search-bar">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="loading">Loading applicants...</p>
      ) : filteredApplicants.length === 0 ? (
        <p className="no-data">No applicants found.</p>
      ) : (
        <div className="table-responsive">
          <table className="applicants-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Resume</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplicants.map((applicant, index) => (
                <tr key={applicant._id}>
                  <td data-label="#">{index + 1}</td>
                  <td data-label="Name">{applicant.name}</td>
                  <td data-label="Email">
                    <FiMail className="icon" /> {applicant.email}
                  </td>
                  <td data-label="Resume">
                    {applicant.resume ? (
                      <a
                        href={applicant.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="resume-link"
                      >
                        <FiFileText className="icon" /> View Resume
                      </a>
                    ) : (
                      "No Resume"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

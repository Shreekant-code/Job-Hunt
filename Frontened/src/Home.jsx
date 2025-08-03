import { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { View } from './Pages/View';

export const Home = () => {
  const [showdata, setData] = useState([]);
  const [viewId, setViewId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/jobs");
      setData(res.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/jobs/${deleteId}`);
      fetchData();
      setShowConfirm(false);
      setDeleteId(null);
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="all-details">
        <h2>All Jobs</h2>
        <ul className="nav-links">
          <li>
            <NavLink to="/create/jobs">+ Create Job</NavLink>
          </li>
        </ul>
      </div>

      <section className="show-all">
        {showdata.map((item) => (
          <div className="card" key={item._id}>
            <h3>{item.title}</h3>
            <p>🏢 <strong>{item.company}</strong></p>
            <p>📍 {item.location}</p>

            <h4>Skills</h4>
            {item.Skill?.length ? (
              <ul className="skill-list">
                {item.Skill.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p>No skills listed.</p>
            )}

            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Salary:</strong> {item.salary}</p>

            <div className="btn-group">
              <button onClick={() => setViewId(item._id)} className="view">
                <FaEye /> View
              </button>

              <button onClick={() => navigate(`/update/jobs/${item._id}`)} className="edit">
                <FaEdit /> Edit
              </button>

              <button
                onClick={() => {
                  setDeleteId(item._id);
                  setShowConfirm(true);
                }}
                className="delete"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </section>

      {viewId && <View id={viewId} onClose={() => setViewId(null)} />}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure you want to delete this job?</h3>
            <div className="modal-buttons">
              <button onClick={confirmDelete} className="confirm-btn">
                Yes, Delete
              </button>
              <button onClick={() => setShowConfirm(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

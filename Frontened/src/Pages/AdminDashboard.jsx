import { FaHome, FaBriefcase, FaPlusCircle, FaUsers, FaCog, FaChartLine, FaBars } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Admindashboard.css";

export const Admindashboard = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(null); // selected job
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("adminName");
    if (name) setAdminName(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  // Sidebar links
  const routes = [
    { path: "/admindashboard", name: "Dashboard", icon: <FaHome /> },
    { path: "/admindashboard/post-job", name: "Post Job", icon: <FaPlusCircle /> },
    { path: "/admindashboard/manage-jobs", name: "Manage Jobs", icon: <FaBriefcase /> },
    { 
      path: selectedJobId 
        ? `/admindashboard/jobs/applicants/${selectedJobId}` 
        : "#", 
      name: "Applied Applicants", 
      icon: <FaUsers /> 
    },
    { path: "/admindashboard/reports", name: "Reports & Analytics", icon: <FaChartLine /> },
    { path: "/admindashboard/details", name: "My Profile", icon: <FaCog /> },
  ];

  return (
    <>
      <header className="header-admin">
        <FaBars className="icon-slider" onClick={() => setMenuOpen(!isMenuOpen)} />
        <div className="admin-detail">
          <h1>Welcome {adminName}</h1>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="full-page">
        <aside className={`sidebar-detail ${isMenuOpen ? "open" : ""}`}>
          {routes.map((item) => (
            <NavLink 
              to={item.path} 
              key={item.name} 
              className={`sidebar-link ${item.path === "#" ? "disabled" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              <div className="icon">{item.icon}</div>
              <div className="link_text">{item.name}</div>
            </NavLink>
          ))}
        </aside>

        <section className="pages">
          <Outlet context={{ setSelectedJobId }} /> {/* pass setter to child */}
        </section>
      </main>
    </>
  );
};

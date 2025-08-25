import { FaHome, FaBriefcase, FaPlusCircle, FaUsers, FaCog, FaChartLine, FaBars } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Admindashboard.css";
import { CreateJob } from "./Createjob";

export const Admindashboard = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const[adminname,setadminname]=useState("")
  const navigate=useNavigate();
  const handlelogout=()=>{
    localStorage.removeItem("adminToken");
    navigate("/");
  }

    useEffect(() => {
    const name = localStorage.getItem("adminName");
    if (name) setadminname(name);
  }, []);



  

  return (
    <>
      <header className="header-admin">
        <FaBars 
          className="icon-slider" 
          onClick={() => setMenuOpen(!isMenuOpen)} 
        />
        <div className="admin-detail">

       
        <h1>Welcome {adminname}</h1>
        <button className="logout-btn" onClick={handlelogout}>Logout</button>
         </div>
        
      </header>

      <main className="full-page">
        <aside className={`sidebar-detail ${isMenuOpen ? "open" : ""}`}>
          {routes.map((item) => (
            <NavLink to={item.path} key={item.name} className="sidebar-link">
              <div className="icon">{item.icon}</div>
              <div className="link_text" onClick={()=>setMenuOpen(false)}>{item.name}</div>
            </NavLink>
          ))}
        </aside>

        <section className="pages">
        <Outlet  />
        </section>
      </main>
    </>
  );
};
const routes = [
  { path: "/admindashboard", name: "Dashboard", icon: <FaHome /> },
  { path: "/admindashboard/post-job", name: "Post Job", icon: <FaPlusCircle /> },
  { path: "/admindashboard/manage-jobs", name: "Manage Jobs", icon: <FaBriefcase /> },
  { path: "/admindashboard/jobs/applicants/jobId", name: "Applied Applicants", icon: <FaUsers /> },
  { path: "/admindashboard/reports", name: "Reports & Analytics", icon: <FaChartLine /> },
  { path: "/admindashboard/details", name: "My Profile", icon: <FaCog /> },
];

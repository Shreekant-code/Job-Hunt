import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./LoginRegister.css";

export const LoginRegisterAdmin = () => {
  const [isRegister, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Redirect if admin token exists
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
    navigate("/admindashboard", { replace: true });

    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        await axios.post("https://job-hunt-3-9hns.onrender.com/admin", {
          name,
          email,
          password,
        });
        toast.success("✅ Registration successful, now login!");
        setRegister(false);
        setEmail("");
        setPassword("");
      } else {
        const res = await axios.post("https://job-hunt-3-9hns.onrender.com/adminlogin", {
          email,
          password,
        });
        const adminToken = res.data.token;
        const adminname=res.data.admin.name;
        localStorage.setItem("adminToken", adminToken); 
        localStorage.setItem("adminName",adminname);
        toast.success("🎉 Admin login successful!");
        navigate("/admindashboard"); // redirect admin
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <header className="login-header">
        <h1 className="login-title">Admin Portal</h1>
        <p className="login-subtitle">{isRegister ? "Register" : "Login"}</p>
      </header>

      <section className="form-section">
        <form className="login-form" onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label htmlFor="name">Enter Your Name</label>
              <input
                type="text"
                id="name"
                placeholder="e.g Shreekant"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Enter Your Email</label>
            <input
              type="email"
              id="email"
              placeholder="e.g abc@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Enter Your Password</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <p className="toggle-text">
            {isRegister ? (
              <>
                Already have an account?{" "}
                <span className="toggle-link" onClick={() => setRegister(false)}>
                  Login
                </span>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <span className="toggle-link" onClick={() => setRegister(true)}>
                  Register
                </span>
              </>
            )}
          </p>

          <button type="submit" className="submit-btn">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
      </section>
    </>
  );
};


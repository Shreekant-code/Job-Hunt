import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./LoginRegister.css";

export const LoginRegisterUser = () => {
  const [isRegister, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const navigate = useNavigate();

  // Redirect if user token exists
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      navigate("/userdashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        await axios.post("https://job-hunt-3-9hns.onrender.com/registeruser", {
          name,
          email,
          password,
        });
        toast.success("✅ Registration successful, now login!");
        setRegister(false);
        setName("");
        setEmail("");
        setPass("");
      } else {
        const res = await axios.post("https://job-hunt-3-9hns.onrender.com/loginuser", {
          email,
          password,
       
        });
        const userToken = res.data.token;
        const userName=res.data.user.name;
        localStorage.setItem("userToken", userToken);
        
localStorage.setItem("userName", userName);
        toast.success("🎉 Login successful!");
        navigate("/userdashboard", { replace: true });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <header className="login-header">
        <h1 className="login-title">Welcome to the Job Portal</h1>
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
              onChange={(e) => setPass(e.target.value)}
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

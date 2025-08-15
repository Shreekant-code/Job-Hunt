import { useState } from "react";
import "./LoginRegister.css";

export const LoginRegister = () => {
  const [isRegister, setRegister] = useState(false);

  return (
    <>
      <header className="login-header">
        <h1 className="login-title">Welcome to the Job Portal</h1>
        <p className="login-subtitle">{isRegister ? "Register" : "Login"}</p>
      </header>

      <section className="form-section">
        <form className="login-form">
          {isRegister && (
            <div className="form-group">
              <label htmlFor="name">Enter Your Name</label>
              <input type="text" id="name" placeholder="e.g Shreekant" required />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Enter Your Email</label>
            <input type="email" id="email" placeholder="e.g abc@gmail.com" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Enter Your Password</label>
            <input type="password" id="password" required  />
          </div>

          <p className="toggle-text">
            {isRegister ? (
              <>
                Already have an account?{" "}
                <span
                  className="toggle-link"
                  onClick={() => setRegister(false)}
                >
                  Login
                </span>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <span
                  className="toggle-link"
                  onClick={() => setRegister(true)}
                >
                  Register
                </span>
              </>
            )}
          </p>

          <button className="submit-btn">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
      </section>
    </>
  );
};

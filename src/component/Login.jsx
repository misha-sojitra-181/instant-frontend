import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please fill all fields");
      setType("error");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      localStorage.setItem("userEmail", res.data.user.email);

      setMessage("Login successful!");
      setType("success");

      setTimeout(() => navigate("/Profile"), 1200);
    } catch {
      setMessage("Invalid email or password");
      setType("error");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        {/* LEFT */}
        <div className="login-left">
          <img src="./Images/logo.png" className="logo" alt="logo" />
          <h1>Welcome Back</h1>
          <p>Secure • Fast • Reliable</p>
          <span>www.instanttopup.com</span>

          <div className="login-icons">
            <i className="fa-solid fa-bolt"></i>
            <i className="fa-solid fa-shield-halved"></i>
            <i className="fa-solid fa-mobile-screen"></i>
          </div>
        </div>

        {/* RIGHT */}
        <div className="login-right">
          <h2>User Login</h2>

          {message && <div className={`msg ${type}`}>{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>

            <div className="links">
              <a href="/Forgotpass">Forgot password?</a>
              <a href="/Changepass">Change password</a>
            </div>

            <button className="login-btn">Login Now</button>

            <p className="signup-text">
              Don’t have an account? <a href="/Signup">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

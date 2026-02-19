import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Forgotpass.css";

export default function Forgotpass() {
  const [email, setEmail] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !newPwd) {
      setMessage("⚠️ Please fill in all fields.");
      setStatus("error");
      return;
    }

    try {
      // ✅ Check if user exists
      const res = await axios.get(`http://localhost:5000/update?email=${email}`);
      const user = res.data;

      if (!user) {
        setMessage("❌ Email not found.");
        setStatus("error");
        return;
      }

      // ✅ Update password directly (Forgot Password)
      const updateRes = await axios.put(
        `http://localhost:5000/edit?email=${email}`,
        { password: newPwd }
      );

      if (updateRes.status === 200) {
        setMessage("✅ Password reset successfully!");
        setStatus("success");

        // Redirect to login after success
        setTimeout(() => navigate("/Loginmini"), 1200);
      } else {
        setMessage("❌ Failed to reset password.");
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Server error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="forgot-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Forgot Password</h2>
          <p className="subtitle">Reset your account password</p>
        </div>

        <div className="login-body">
          {message && <div className={`message ${status}`}>{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <i className="fas fa-user"></i>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Enter New Password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                required
              />
            </div>

            <div className="checkbox-group">
              <a href="/Login" className="login-link">
                Back to Login
              </a>
            </div>

            <button type="submit" className="login-btn">
              RESET PASSWORD
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

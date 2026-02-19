import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Changepass.css";

export default function Changepass() {
  const [email, setEmail] = useState("");
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !oldPwd || !newPwd) {
      setMessage("⚠️ Please fill in all fields.");
      setStatus("error");
      return;
    }

    try {
      // ✅ Fetch user by email from your MongoDB backend
      const res = await axios.get(`http://localhost:5000/update?email=${email}`);
      const user = res.data;

      if (!user) {
        setMessage("❌ Email not found.");
        setStatus("error");
        return;
      }

      if (user.password !== oldPwd) {
        setMessage("❌ Old password is incorrect.");
        setStatus("error");
        return;
      }

      // ✅ Update password
      const updateRes = await axios.put(
        `http://localhost:5000/edit?email=${email}`,
        { password: newPwd }
      );

      if (updateRes.status === 200) {
        setMessage("✅ Password changed successfully!");
        setStatus("success");

        // Redirect after success
        setTimeout(() => navigate("/Loginmini"), 1200);
      } else {
        setMessage("❌ Failed to update password.");
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Server error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="changepass-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome to the Website</h2>
          <p className="subtitle">Connect and explore with us.</p>
        </div>

        <div className="login-body">
          <h3 className="form-title">CHANGE PASSWORD</h3>

          {message && <div className={`message ${status}`}>{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Enter Old Password"
                value={oldPwd}
                onChange={(e) => setOldPwd(e.target.value)}
              />
            </div>

            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Enter New Password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
              />
            </div>

            <div className="checkbox-group">
              <a href="/Login" className="login-link">
                Login?
              </a>
            </div>

            <button type="submit" className="login-btn">
              CHANGE PASSWORD
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

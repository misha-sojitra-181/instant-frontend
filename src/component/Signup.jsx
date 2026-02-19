import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    uname: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    password: "",
    cpassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.cpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message);
      navigate("/Login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">

        {/* LEFT */}
        <div className="signup-left">
          <img src="./Images/logo.png" alt="logo" className="logo"/>
          <h1>Instant Register</h1>
          <p>Fast • Secure • Reliable</p>
          <span>www.instanttopup.com</span>

          <div className="floating-icons">
            <i className="fa-solid fa-bolt"></i>
            <i className="fa-solid fa-shield-halved"></i>
            <i className="fa-solid fa-mobile-screen"></i>
          </div>
        </div>

        {/* RIGHT */}
        <div className="signup-right">
          <h2>Create Account</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input required value={formData.fname}
                onChange={(e)=>setFormData({...formData,fname:e.target.value})}/>
              <label>Full Name</label>
            </div>

            <div className="input-group">
              <input required value={formData.uname}
                onChange={(e)=>setFormData({...formData,uname:e.target.value})}/>
              <label>Username</label>
            </div>

            <div className="input-group">
              <input type="email" required value={formData.email}
                onChange={(e)=>setFormData({...formData,email:e.target.value})}/>
              <label>Email</label>
            </div>

            <div className="input-group">
              <input required value={formData.mobile}
                onChange={(e)=>setFormData({...formData,mobile:e.target.value})}/>
              <label>Mobile</label>
            </div>

            {/* GENDER */}
            <div className="gender-section">
              <p className="gender-title">Gender</p>
              <div className="gender-group">

                <label className="gender-card">
                  <input type="radio" name="gender" value="male"
                    onChange={(e)=>setFormData({...formData, gender:e.target.value})}/>
                  <span className="gender-title">Male</span>
                </label>

                <label className="gender-card">
                  <input type="radio" name="gender" value="female"
                    onChange={(e)=>setFormData({...formData, gender:e.target.value})}/>
                  <span className="gender-title">Female</span>
                </label>

              </div>
            </div>

            <div className="input-group">
              <input type="date" required
                onChange={(e)=>setFormData({...formData,dob:e.target.value})}/>
            </div>

            <div className="input-group">
              <input type="password" required
                onChange={(e)=>setFormData({...formData,password:e.target.value})}/>
              <label>Password</label>
            </div>

            <div className="input-group">
              <input type="password" required
                onChange={(e)=>setFormData({...formData,cpassword:e.target.value})}/>
              <label>Confirm Password</label>
            </div>

            <button className="signup-btn">Register Now</button>

            <p className="login-link">
              Already registered? <a href="/Login">Login</a>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

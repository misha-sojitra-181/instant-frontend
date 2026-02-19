import React from 'react'
import axios from 'axios';
import { NavLink } from "react-router-dom";

import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import './Profile.css'

export default function Profile() {
  const navigate=useNavigate();
  const [profile, setProfile] = useState(null);

  
  useEffect(() => {
  const email = localStorage.getItem("userEmail");

  if (!email) {
    navigate("/login");
    return;
  }

  axios
    .get(`http://localhost:5000/update?email=${email}`)
    .then(res => setProfile(res.data))
    .catch(err => console.log(err));
}, []);

if (!profile) {
    return <div className="text-center mt-5">Loading profile...</div>;
  }

  return (
    <>
    
<div className="profile-wrapper">
  <div className="profile-container-modern">

    {/* LEFT PROFILE CARD */}
    <div className="profile-card">
      <img src="./Images/person.jpg" alt="Profile" />
      <h3>{profile.fname}</h3>
      <span className="email">{profile.email}</span>

      <div className="social-icons">
        <i className="fa-brands fa-twitter"></i>
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-linkedin"></i>
      </div>
    </div>

    {/* RIGHT CONTENT */}
    <div className="profile-content">

      {/* TABS */}
      <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <NavLink
                  to="/Profile"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                >
                  Overview
                </NavLink>
              </li>
      
              <li className="nav-item">
                <NavLink
                  to="/Editprofile"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                >
                  Edit Profile
                </NavLink>
              </li>
            </ul>


      {/* ABOUT */}
      <div className="info-box">
        <h4>About</h4>
        <p>
          Instant TopUp makes mobile recharges fast, secure, and reliable.
          Enjoy seamless services anytime, anywhere with complete trust.
        </p>
      </div>

      {/* DETAILS CARDS */}
     <div className="details-grid">

  <div className="detail-card">
    <i className="fa-solid fa-user"></i>&nbsp;&nbsp;&nbsp;
    <span>Username</span>
    <h6>{profile.uname}</h6>
  </div>

  <div className="detail-card">
    <i className="fa-solid fa-phone"></i>&nbsp;&nbsp;&nbsp;
    <span>Mobile</span>
    <h6>{profile.mobile}</h6>
  </div>

  <div className="detail-card">
    <i className="fa-solid fa-venus-mars"></i>&nbsp;&nbsp;&nbsp;
    <span>Gender</span>
    <h6>{profile.gender}</h6>
  </div>

  <div className="detail-card">
    <i className="fa-solid fa-cake-candles"></i>&nbsp;&nbsp;&nbsp;
    <span>Date of Birth</span>
    <h6>{profile.dob}</h6>
  </div>

</div>


    </div>
  </div>
</div>

    </>
  )
}


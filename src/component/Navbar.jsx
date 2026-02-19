import React from 'react'
import './Navbar.css'
import { Outlet } from 'react-router-dom'
export default function Navbar() {
  return (
    <>
{/* NAVBAR */}
<nav className="navbar navbar-expand-lg top-navbar">
  <div className="container-fluid px-4">
    <a className="navbar-brand" href="/Navbar">
      <img src="./Images/logo.png" alt="Logo" />
      Instant TopUp
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navMenu">
      <ul className="navbar-nav mx-auto">
        <li className="nav-item">
          <a className="nav-link" href="/Userhome">
            <i className="fa-solid fa-house" /> Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/Mobile">
            <i className="fa-solid fa-list" /> View Plans
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/Wifi">
            <i className="fa-solid fa-wifi" /> WiFi
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/Mobile">
            <i className="fa-solid fa-bolt" /> Recharge
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">
            <i className="fa-solid fa-right-from-bracket" /> Logout
          </a>
        </li>
      </ul>
      <a href="/Profile" className="btn profile-btn">
        <i className="fa-solid fa-user" /> Profile
      </a>
    </div>
  </div>
</nav>
<Outlet></Outlet>
    </>
  )
}

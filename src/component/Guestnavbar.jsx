import React from 'react'
import './Guestnavbar.css'
import { Outlet, Link } from 'react-router-dom'

export default function Guestnavbar() {

  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: "fa-house"
    },
    {
      name: "View Plans",
      path: "/Guestmobile",
      icon: "fa-list"
    },
    {
      name: "WiFi",
      path: "/Guestwifi",
      icon: "fa-wifi"
    },
    {
      name: "Recharge",
      path: "/Guestmobile",
      icon: "fa-bolt"
    },
    {
      name: "Login",
      path: "/Login",
      icon: "fa-right-from-bracket"
    }
  ]

  return (
    <>
      <nav className="navbar navbar-expand-lg top-navbar">
        <div className="container-fluid">

          <Link className="navbar-brand" to="/Guesthome">
            <img src="./Images/logo.png" alt="Logo" />
            Instant TopUp
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav mx-auto">

              {menuItems.map((item, index) => (
                <li className="nav-item" key={index}>
                  <Link className="nav-link" to={item.path}>
                    <i className={`fa-solid ${item.icon}`} /> {item.name}
                  </Link>
                </li>
              ))}

            </ul>

            <Link to="/Login" className="btn profile-btn">
              <i className="fa-solid fa-user" /> Profile
            </Link>
          </div>

        </div>
      </nav>

      <Outlet />
    </>
  )
}

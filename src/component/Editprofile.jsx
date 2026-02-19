import React from 'react'
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';

import './Editprofile.css'
export default function Editprofile() {

    const navigate=useNavigate();
  const [Editprofile, setEditprofile] = useState({
  fname: "",
  uname: "",
  email: "",
  mobile: "",
  gender: "",
  dob: ""
  
});
const [image, setImage] = useState(null);

const handleImageChange = (e) => {
  setImage(e.target.files[0]);
};
  
  useEffect(() => {
  const email = localStorage.getItem("userEmail");

  if (!email) {
    navigate("/login");
    return;
  }

  axios
    .get(`http://localhost:5000/update?email=${email}`)
    .then(res => setEditprofile(res.data))
    .catch(err => console.log(err));
}, []);

if (!Editprofile) {
    return <div className="text-center mt-5">Loading profile...</div>;
  }
const handleChange = (e) => {
  const { name, value } = e.target;
  setEditprofile(prev => ({
    ...prev,
    [name]: value
  }));
};

const handleUpdate = () => {
  const email = localStorage.getItem("userEmail");


  axios
    .put(`http://localhost:5000/edit?email=${email}`, Editprofile)
    .then(res => {
      alert(res.data.message);
      navigate("/Profile");
    })
    .catch(err => {
      console.log(err);
      alert("Update failed");
    });
};




  return (
    <>
   <div className="profile-wrapper">
  <div className="profile-container">
    {/* Left section */}
    <div className="profile-left">
      <img src="/images/person.jpg" alt="JohnDoe" />
      <h3>{Editprofile.fname}</h3>
      <p>{Editprofile.email}</p>
      <div className="social-icons">
        <i className="fa-brands fa-twitter" />
        <i className="fa-brands fa-facebook" />
        <i className="fa-brands fa-instagram" />
        <i className="fa-brands fa-linkedin" />
      </div>
    </div>
    {/* Right section */}
    <div className="profile-right">
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

      <form>
         {!Editprofile ? (
    <tr>
      <td colSpan="3">Loading...</td>
    </tr>
  ) : (
    <>
        <div className="mb-3">
          <label>Profile Image</label>
          <br />
          <img src="./Images/person.jpg" alt="Profile" height={100} width={100} style={{borderRadius: 10}} />
          <input type="file" className="form-control mt-2" name="image" accept="Images/*" value={Editprofile.image}/>
        </div>
        <div className="mb-3">
          <label>Full Name</label>
          <input type="text" className="form-control" value={Editprofile.fname} onChange={handleChange} name='fname' />
        </div>
        <div className="mb-3">
          <label>User Name</label>
          <input type="text" className="form-control" value={Editprofile.uname}  onChange={handleChange} name='uname'/>
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={Editprofile.email}  onChange={handleChange} name='email'/>
        </div>
        <div className="mb-3">
          <label>Mobile Number</label>
          <input type="text" className="form-control" value={Editprofile.mobile}   onChange={handleChange} name='mobile'/>
        </div>
        <div className="mb-3">
          <label>Gender</label><br />
          <input type="radio" name="gender" checked={Editprofile.gender==="Male" } onChange={handleChange} value="Male"/> Male
          <input type="radio" name="gender" checked={Editprofile.gender==="Female"}  onChange={handleChange} value="Female"/> Female
        </div>
        <div className="mb-3">
          <label>Date of Birth</label>
          <input type="date" className="form-control" value={Editprofile.dob}   onChange={handleChange} name='dob'/>
        </div>
        <button type="button" onClick={handleUpdate} >Update</button>
        </>
  )}
      </form>
      
    </div>
  </div>
</div>

    </>
  )
}

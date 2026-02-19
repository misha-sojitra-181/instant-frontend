import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import './Mobile.css'
export default function Mobile() {
  const navigate = useNavigate();
  const[plans,setplans]=useState([]);
  useEffect(() => {
  axios.get("http://localhost:5000/mobile")
    .then(res => {
      console.log("MOBILE RESPONSE:", res.data);
      setplans(Array.isArray(res.data) ? res.data : []);
    })
    .catch(() => setplans([]));
}, []);



  return (
    
    <>
   <div className="plan-wrapper">
  <h2 className="plan-title">
    <i className="fa-solid fa-mobile-screen-button" /> Mobile Plans
  </h2>

  <div className="plan-grid">
    {plans.length === 0 ? (
      <p className="no-plan">No plans available</p>
    ) : (
      plans.map((plan, index) => (
        <div className="plan-card" key={index}>
          <div className="plan-header">
            {plan.plan_name}
          </div>

          <div className="plan-body">
            <p><strong>📶 Data:</strong> {plan.Data}</p>
            <p><strong>⏳ Validity:</strong> {plan.validity}</p>
            <p><strong>💰 Price:</strong> ₹{plan.amount}</p>
            <p className="plan-desc">{plan.description}</p>
          </div>

          <button
            className="plan-btn"
          onClick={() =>
    navigate("/Pay", {
      state: { planid: plan.planid }
    })
  }
          >
            Buy Now
          </button>
        </div>
      ))
    )}
  </div>
</div>


    </>
  )
}

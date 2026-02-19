import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Pay.css";

export default function Pay() {
  const navigate = useNavigate();
  const location = useLocation();
  const planid = location.state?.planid;

  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);

 

 useEffect(() => {
  const email = localStorage.getItem("userEmail");

  if (!email) {
    navigate("/Login");
    return;
  }

  if (!planid) {
    navigate("/Mobile");
    return;
  }

  // ✅ Fetch logged-in user
  axios
    .get(`http://localhost:5000/update?email=${email}`)
    .then(res => setUser(res.data))
    .catch(() => navigate("/Login"));

  // ✅ Fetch ALL plans, then filter selected one
  axios
    .get("http://localhost:5000/mobile")
    .then(res => {
      const selectedPlan = res.data.find(
        p => p.planid === planid
      );

      if (!selectedPlan) {
        navigate("/Mobile");
      } else {
        setPlan(selectedPlan);
      }
    })
    .catch(() => navigate("/Mobile"));

}, [navigate, planid]);
if (!user || !plan) {
  return <div className="pay-loading">Loading payment details...</div>;
}


  return (
    <div className="pay-bg">
      <div className="pay-card animate-in">

        {/* LEFT */}
        <div className="pay-left">
          <h1>Instant TopUp</h1>
          <p>Secure • Fast • Reliable</p>
          <img src="./Images/doller.png" alt="payment" />
        </div>

        {/* RIGHT */}
        <div className="pay-right">
          <h2>Confirm & Pay</h2>

          <div className="summary-box">
            <div className="summary-item">
              <span>Plan</span>
              <strong>{plan.plan_name}</strong>
            </div>

            <div className="summary-item">
              <span>Validity</span>
              <strong>{plan.validity}</strong>
            </div>

            <div className="summary-item highlight">
              <span>Amount</span>
              <strong>₹{plan.amount}</strong>
            </div>
          </div>

          <div className="input-box">
            <label>Registered Mobile</label>
            <input value={user.mobile} readOnly />
          </div>
          <button
            className="back-btn"
            onClick={() =>
              navigate("/Mobile")
            }
          >
           ← BACK
          </button>
          <button
            className="pay-btn"
            onClick={() =>
            navigate("/Payment", {
              state: { plan }   // ✅ PASS FULL PLAN
            })
          }
          >
            Proceed to Pay →
          </button>
        </div>

      </div>
    </div>
  );
}

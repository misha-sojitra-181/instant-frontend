import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Pay.css";

export default function Wifipay() {
  const navigate = useNavigate();
  const location = useLocation();
  const wifiid = location.state?.wifiid;

  const [user, setUser] = useState(null);
  const [wifi, setWifi] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    if (!email) {
      navigate("/login");
      return;
    }

    if (!wifiid) {
      navigate("/Wifi");
      return;
    }

    axios
      .get(`http://localhost:5000/update?email=${email}`)
      .then(res => setUser(res.data))
      .catch(() => navigate("/login"));

    axios
      .get(`http://localhost:5000/wifi/${wifiid}`)
      .then(res => setWifi(res.data))
      .catch(() => navigate("/Wifi"));
  }, [navigate, wifiid]);

  if (!user || !wifi) {
    return <div className="pay-loading">Loading WiFi payment details...</div>;
  }

  return (
    <div className="pay-bg">
      <div className="pay-card animate-in">

        {/* LEFT */}
        <div className="pay-left">
          <h1>Instant WiFi TopUp</h1>
          <p>Secure • Fast • Reliable</p>
          <img src="./Images/doller.png" alt="payment" />
        </div>

        {/* RIGHT */}
        <div className="pay-right">
          <h2>Confirm & Pay</h2>

          <div className="summary-box">
            <div className="summary-item">
              <span>Plan</span>
              <strong>{wifi.plan_name}</strong>
            </div>

            <div className="summary-item">
              <span>Validity</span>
              <strong>{wifi.validity}</strong>
            </div>

            <div className="summary-item highlight">
              <span>Amount</span>
              <strong>₹{wifi.amount}</strong>
            </div>
          </div>

          <div className="input-box">
            <label>Registered Mobile</label>
            <input value={user.mobile} readOnly />
          </div>
            <button
            className="back-btn"
            onClick={() =>
              navigate("/Wifi")
            }
          >
           ← BACK
          </button>
          <button
            className="pay-btn"
            onClick={() =>
              navigate("/Wifipayment", {
                state: { wifi }
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

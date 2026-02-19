import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Wifi.css";

export default function Wifi() {
  const navigate = useNavigate();
  const [wifi, setwifi] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/wifi")
      .then(res => setwifi(Array.isArray(res.data) ? res.data : []))
      .catch(() => setwifi([]));
  }, []);

  return (
    <div className="plan-container">
      <h2 className="plan-title">
        <i className="fa-solid fa-wifi" /> WiFi Plans
      </h2>

      <div className="plan-grid">
        {wifi.length === 0 ? (
          <p className="no-plan">No WiFi plans available</p>
        ) : (
          wifi.map((wifis, index) => (
            <div className="plan-card" key={index}>
              
              <div className="plan-header">
                {wifis.plan_name}
              </div>

              <div className="plan-body">
                <p>📶 <b>Data:</b> {wifis.data}</p>
                <p>⏳ <b>Validity:</b> {wifis.validity}</p>
                <p>💰 <b>Price:</b> ₹{wifis.amount}</p>
                <p className="plan-desc">{wifis.description}</p>
              </div>

              <button
              className="plan-btn"
              onClick={() =>
                navigate("/Wifipay", {
                  state: { wifiid: wifis.wifiid } // ✅ IMPORTANT
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
  );
}

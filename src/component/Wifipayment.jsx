import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Payment.css";

export default function WifiPayment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { wifi } = location.state || {};

  const [method, setMethod] = useState("card");
  const [txnId, setTxnId] = useState("");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 200);
  }, []);

  if (!wifi) {
    return <div className="text-center mt-5">No WiFi plan data found</div>;
  }

  /* ===== Dynamic Label & Placeholder ===== */
  const getInputConfig = () => {
    if (method === "card") {
      return {
        label: "Card Reference",
        placeholder: "Enter last 4 digits of card"
      };
    }
    if (method === "net") {
      return {
        label: "Bank Reference Number",
        placeholder: "Enter bank reference number"
      };
    }
    return {
      label: "UPI Transaction ID",
      placeholder: "Enter UPI transaction ID"
    };
  };

  const { label, placeholder } = getInputConfig();

  const handlePayment = async () => {
    if (!txnId.trim()) {
      alert("⚠️ Please enter transaction details");
      return;
    }

    const payload = {
      pid: Math.floor(Math.random() * 100000),
      id: localStorage.getItem("userEmail") || "guest",
      wifiid: wifi.wifiid,
      amount: wifi.amount,
      method,
      tid: txnId,
      rechargeat: new Date().toISOString()
    };

    try {
      await axios.post("http://localhost:5000/w_payment", payload);
      alert("✅ Payment successful!");
      navigate("/Feedback", { state: { wifi, method, txnId } });
    } catch (err) {
      console.error(err);
      alert("❌ Payment failed. Try again.");
    }
  };

  return (
    <div className="payment-page">
      <div className={`payment-card ${animate ? "show" : ""}`}>

        {/* LEFT PANEL */}
        <div className="left-panel">
          <div className="amount-box">
            <h3>Total Payable</h3>
            <h1>₹{wifi.amount}</h1>
            <p>{wifi.plan_name}</p>
            <span>Validity: {wifi.validity}</span>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <h2>Secure Payment</h2>

          {/* PAYMENT METHODS */}
          <div className="method-group">
            <div
              className={`pay-method ${method === "card" ? "active" : ""}`}
              onClick={() => setMethod("card")}
            >
              💳 {method === "card" && <span className="label">Card</span>}
            </div>

            <div
              className={`pay-method ${method === "net" ? "active" : ""}`}
              onClick={() => setMethod("net")}
            >
              🏦 {method === "net" && <span className="label">Net Banking</span>}
            </div>

            <div
              className={`pay-method ${method === "upi" ? "active" : ""}`}
              onClick={() => setMethod("upi")}
            >
              📱 {method === "upi" && <span className="label">UPI</span>}
            </div>
          </div>

          {/* INPUT GROUP */}
          <div className="input-group">
            <label className="txn-label">{label}</label>
            <input
              type="text"
              className="txn-input"
              placeholder={placeholder}
              value={txnId}
              onChange={(e) => setTxnId(e.target.value)}
            />
          </div>

          {/* PAY BUTTON */}
          <button className="pay-btn" onClick={handlePayment}>
            Pay ₹{wifi.amount}
          </button>

          <p className="secure-text">🔒 100% Secure Payment</p>
        </div>
      </div>
    </div>
  );
}

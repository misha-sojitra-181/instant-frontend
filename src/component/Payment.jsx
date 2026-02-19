import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Payment.css";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan } = location.state || {};

  const [method, setMethod] = useState("card");
  const [txnId, setTxnId] = useState("");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 200);
  }, []);

  // Clear input when payment method changes
  useEffect(() => {
    setTxnId("");
  }, [method]);

  if (!plan) {
    return <div className="text-center mt-5">No payment data found</div>;
  }

  // Dynamic input text
  const getInputConfig = () => {
    switch (method) {
      case "card":
        return {
          label: "Card Reference",
          placeholder: "Enter last 4 digits of card"
        };
      case "net":
        return {
          label: "Bank Reference Number",
          placeholder: "Enter bank transaction reference number"
        };
      case "upi":
        return {
          label: "UPI Transaction ID",
          placeholder: "Enter UPI transaction ID"
        };
      default:
        return {};
    }
  };

  const handlePayment = async () => {
    if (!txnId) {
      alert("⚠️ Please enter required reference number");
      return;
    }

    const payload = plan.wifiid
      ? {
          pid: Math.floor(Math.random() * 100000),
          id: localStorage.getItem("userEmail"),
          wifiid: plan.wifiid,
          amount: plan.amount,
          method,
          tid: txnId,
          rechargeat: new Date().toISOString()
        }
      : {
          pid: Math.floor(Math.random() * 100000),
          id: localStorage.getItem("userEmail"),
          planid: plan.planid,
          amount: plan.amount,
          method,
          tid: txnId,
          rechargeat: new Date().toISOString()
        };

    const url = plan.wifiid
      ? "http://localhost:5000/w_payment"
      : "http://localhost:5000/p_payment";

    try {
      await axios.post(url, payload);
      alert("✅ Payment successful!");
      navigate("/Feedback", { state: { plan, method, txnId } });
    } catch (error) {
      console.error(error);
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
            <h1>₹{plan.amount}</h1>
            <p>{plan.plan_name}</p>
            <span>Validity: {plan.validity}</span>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <h2>Secure Payment</h2>

          {/* PAYMENT METHODS */}
          <div className="method-group">
            {[
              { key: "card", icon: "💳", label: "Card" },
              { key: "net", icon: "🏦", label: "Net Banking" },
              { key: "upi", icon: "📱", label: "UPI" }
            ].map((opt) => (
              <div
                key={opt.key}
                className={`pay-method ${method === opt.key ? "active" : ""}`}
                onClick={() => setMethod(opt.key)}
              >
                <span className="icon">{opt.icon}</span>
                {method === opt.key && (
                  <span className="label">{opt.label}</span>
                )}
              </div>
            ))}
          </div>

          {/* INPUT FIELD */}
          {/* INPUT FIELD */}
          <div className="input-group">
            <label className="input-label">
              {getInputConfig().label}
            </label>

            <div className="input-wrapper">
              <input
                type="text"
                className="txn-input"
                placeholder={getInputConfig().placeholder}
                value={txnId}
                autoComplete="off"
                onChange={(e) => setTxnId(e.target.value)}
              />
            </div>
          </div>


          {/* PAY BUTTON */}
          <button className="pay-btn" onClick={handlePayment}>
            Pay ₹{plan.amount}
          </button>

          <p className="secure-text">🔒 100% Secure Payment</p>
        </div>
      </div>
    </div>
  );
}

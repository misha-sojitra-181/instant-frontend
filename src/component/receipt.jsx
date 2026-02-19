import React from "react";
import "./receipt.css";

export default function Receipt() {
  const receipt = {
    txn: "TXN945823615",
    plan: "Unlimited 5G Recharge",
    amount: "₹399",
    validity: "28 Days",
    mobile: "9876543210",
    method: "UPI • Google Pay",
    date: "06 Feb 2026",
    time: "10:45 AM",
  };

  return (
    <div className="receipt-wrapper">

      {/* animated background */}
      <div className="blob b1"></div>
      <div className="blob b2"></div>
      <div className="blob b3"></div>

      <div className="receipt-box">

        {/* success animation */}
        <div className="success-ring">
          <i className="fa-solid fa-check"></i>
        </div>

        <h2>Payment Successful</h2>
        <p className="tagline">Thanks for choosing Instant Recharge</p>

        <div className="amount">{receipt.amount}</div>

        <div className="info">
          <div><span>Mobile</span><span>{receipt.mobile}</span></div>
          <div><span>Plan</span><span>{receipt.plan}</span></div>
          <div><span>Validity</span><span>{receipt.validity}</span></div>
          <div><span>Transaction ID</span><span>{receipt.txn}</span></div>
          <div><span>Payment</span><span>{receipt.method}</span></div>
          <div><span>Date & Time</span><span>{receipt.date}, {receipt.time}</span></div>
        </div>

        <button className="download">
          <i className="fa-solid fa-download"></i> Download Receipt
        </button>

      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Feedback.css";

export default function Feedback() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [mood, setMood] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (!rating) {
      alert("⚠️ Please give a rating!");
      return;
    }

    const payload = {
      id: Math.floor(Math.random() * 100000), // unique feedback id
      userEmail: localStorage.getItem("userEmail") || "guest",
      rating,
      mood,
      comment,
      createdAt: new Date().toISOString()
    };

    try {
      await axios.post("http://localhost:5000/feedback", payload);
      alert("✅ Feedback submitted successfully!");
      navigate("/"); // go back to home page
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit feedback. Try again.");
    }
  };

  return (
    <div className="feedback-bg">
      <div className="icon-bg">
        <span>⭐</span>
        <span>💬</span>
        <span>❤️</span>
        <span>👍</span>
        <span>✨</span>
        <span>😊</span>
      </div>

      <div className="feedback-card float-in">
        <h2>✨ Share Your Feedback</h2>
        <p className="subtitle">Your opinion helps us improve</p>

        {/* Emoji Selector */}
        <div className="emoji-row">
          <div
            className={`emoji-box ${mood === "happy" ? "active" : ""}`}
            onClick={() => { setMood("happy"); setRating(5); }}
          >
            😊 <span>Great</span>
          </div>

          <div
            className={`emoji-box ${mood === "neutral" ? "active" : ""}`}
            onClick={() => { setMood("neutral"); setRating(3); }}
          >
            😐 <span>Okay</span>
          </div>

          <div
            className={`emoji-box ${mood === "sad" ? "active" : ""}`}
            onClick={() => { setMood("sad"); setRating(1); }}
          >
            😞 <span>Bad</span>
          </div>
        </div>

        {/* Text Area */}
        <textarea
          rows="4"
          placeholder="Tell us what you liked or what we can improve..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Rating */}
        <div className="rating-section">
          <p className="rate">Rate your experience</p>
          <div className="stars">
            {[1,2,3,4,5].map(num => (
              <span
                key={num}
                className={num <= rating ? "star filled" : "star"}
                onClick={() => setRating(num)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Button */}
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Feedback 🚀
        </button>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "./Guesthome.css";

const slides = [
  {
    img: "./Images/h3.png",
    title: "Instant Mobile Recharges",
    text: "Fast, secure and seamless payments in seconds.",
    btn: "Join Us",
  },
  {
    img: "./Images/h4.png",
    title: "Instant Wifi Recharges",
    text: "Fast, secure and seamless payments in seconds.",
    btn: "Join Us",
  },
  {
    img: "./Images/r9.jpg",
    title: "Instant Mobile Recharges",
    text: "Fast, secure and seamless payments in seconds.",
    btn: "Join Us",
  },
  {
    img: "./Images/h5.jpg",
    title: "Instant Wifi Recharges",
    text: "Fast, secure and seamless payments in seconds.",
    btn: "Join Us",
  },
  {
    img: "./Images/r6.jpg",
    title: "Instant Mobile Recharges",
    text: "Fast, secure and seamless payments in seconds.",
    btn: "Join Us",
  },
  {
    img: "./Images/r8.png",
    title: "Instant Wifi Recharges",
    text: "Fast, secure and seamless payments in seconds.",
    btn: "Join Us",
  },
];

export default function Userhome() {
  const [index, setIndex] = useState(0);

  /* ===== AUTO SLIDE CHANGE ===== */
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  /* ===== SCROLL REVEAL EFFECT ===== */
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.25 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home">

      {/* HERO SLIDER */}
      <section className="hero-new">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`hero-slide-new ${i === index ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="hero-overlay-new">
              <h1>{slide.title}</h1>
              <p>{slide.text}</p>
              <button>{slide.btn}</button>
            </div>
          </div>
        ))}

        {/* DOTS */}
        <div className="hero-dots">
          {slides.map((_, i) => (
            <span
              key={i}
              className={i === index ? "active" : ""}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="services reveal left">
        <h2>Our Services</h2>

        <div className="service-grid">
          <div className="service-card reveal">
            <i className="fa-solid fa-lock"></i>
            <h4>Secure Payment</h4>
            <p>Advanced encryption for worry-free transactions.</p>
          </div>

          <div className="service-card reveal">
            <i className="fa-solid fa-bolt"></i>
            <h4>Instant Recharge</h4>
            <p>Mobile & WiFi recharge in under 5 seconds.</p>
          </div>

          <div className="service-card reveal">
            <i className="fa-solid fa-user-shield"></i>
            <h4>Account Safety</h4>
            <p>Your data stays private and protected.</p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="team reveal right">
        <h2>Meet Our Team</h2>

        <div className="team-grid">
          <div className="team-card reveal">
            <img src="/images/shruti1.jpg" alt="Shruti" />
            <h5>Shruti Golakiya</h5>
          </div>

          <div className="team-card reveal">
            <img src="/images/mishu.jpg" alt="Misha" />
            <h5>Misha Sojitra</h5>
          </div>

          <div className="team-card reveal">
            <img src="/images/dhruvi.jpg" alt="Dhruvi" />
            <h5>Dhruvi Sojitra</h5>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process reveal left">
        <h2>How It Works</h2>

        <div className="process-grid">
          <div className="process-card">
            <span>01</span>
            <h4>Create Account</h4>
            <p>Sign up securely in just a few clicks.</p>
          </div>

          <div className="process-card">
            <span>02</span>
            <h4>Select Service</h4>
            <p>Choose donation, recharge or other services.</p>
          </div>

          <div className="process-card">
            <span>03</span>
            <h4>Complete Action</h4>
            <p>Fast, safe and instant processing.</p>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="why reveal right">
        <h2>Why Choose Us</h2>

        <div className="why-grid">
          <div className="why-card">
            <i className="fa-solid fa-shield-heart"></i>
            <h4>Trusted Platform</h4>
            <p>Used by thousands with 99.9% uptime.</p>
          </div>

          <div className="why-card">
            <i className="fa-solid fa-clock"></i>
            <h4>Quick Processing</h4>
            <p>Instant confirmation & zero delay.</p>
          </div>

          <div className="why-card">
            <i className="fa-solid fa-headset"></i>
            <h4>24/7 Support</h4>
            <p>Always here when you need us.</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats reveal left">
        <div className="stat-box">
          <h1>50K+</h1>
          <p>Happy Users</p>
        </div>

        <div className="stat-box">
          <h1>120K+</h1>
          <p>Successful Recharges</p>
        </div>

        <div className="stat-box">
          <h1>10K+</h1>
          <p>Lives Impacted</p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta reveal right">
        <h2>Ready to Get Started?</h2>
        <p>Join today and experience fast, secure services.</p>
        <button>Get Started</button>
      </section>

    </div>
  );
}

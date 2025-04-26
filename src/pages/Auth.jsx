// File: src/pages/Auth.js

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import don from '../assets/don.jpg'; // Import the image from the assets folder

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [fullName, setFullName] = useState("");

  const jordanGovernorates = [
    "Amman", "Irbid", "Zarqa", "Balqa", "Madaba", "Aqaba",
    "Karak", "Tafilah", "Ma'an", "Jerash", "Ajloun", "Mafraq"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSignIn && password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    alert(`${isSignIn ? "Sign In" : "Sign Up"} -> Email: ${email}, Password: ${password}, Phone: ${phone}, Country: ${country}`);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert("Redirect to Forgot Password page or modal.");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 text-white"
      style={{
        backgroundImage: `url(${don})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <div className="p-4 w-100" style={{ maxWidth: '450px', backgroundColor: "rgba(255, 255, 255, 0.23)", borderRadius: '10px', boxShadow: "0 4px 8px rgb(0, 0, 0)" }}>
        <h4 className="text-center mb-3" style={{ fontSize: "30px", fontFamily: "Arial, sans-serif", color:"#808080" }}>
          {isSignIn ? "Welcome Back" : "Create Account"}
        </h4>
        <h5 className="text-center mb-4" style={{ fontSize: "18px", fontFamily: "Arial, sans-serif", color: "#005eff" }}>
          {isSignIn ? "Sign in to continue to Give & Gather" : "Join our community and start sharing kindness"}
        </h5>

        <form onSubmit={handleSubmit}>
          {!isSignIn && (
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label" style={{ fontSize: "16px", fontFamily: "Arial, sans-serif", color: "#808080" }}>Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{ fontSize: "16px", fontFamily: "Arial, sans-serif", color: "#808080" }}>Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          

          {!isSignIn && (
            <>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label" style={{ fontSize: "16px", fontFamily: "Arial, sans-serif", color: "#808080" }}>Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  placeholder="+962 (Phone Number)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="country" className="form-label" style={{ fontSize: "16px", fontFamily: "Arial, sans-serif", color: "#808080" }}>Governorate</label>
                <select
                  className="form-select"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  <option value="">Select your governorate</option>
                  {jordanGovernorates.map((gov, index) => (
                    <option key={index} value={gov}>{gov}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
            <label htmlFor="password" className="form-label" style={{ fontSize: "16px", fontFamily: "Arial, sans-serif", color: "#808080" }}>Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label" style={{ fontSize: "16px", fontFamily: "Arial, sans-serif", color: "#808080" }}>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary w-100" style={{ fontSize: "16px", fontFamily: "Arial, sans-serif" }}>
            {isSignIn ? "Sign In" : "Create Account"}
          </button>

          {isSignIn && (
            <div className="d-flex justify-content-between mt-3">
              <div>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" className="ms-2" style={{ fontSize: "14px", fontFamily: "Arial, sans-serif", color: "#808080" }}>Remember me</label>
              </div>
              <a href="#" className="text-primary" onClick={handleForgotPassword} style={{ fontSize: "14px", fontFamily: "Arial, sans-serif" }}>Forgot password?</a>
            </div>
          )}
        </form>

        <div className="text-center mt-4">
          <p style={{ fontSize: "14px", fontFamily: "Arial, sans-serif", color: "#808080" }}>
            {isSignIn ? "Don’t have an account?" : "Already have an account?"}{" "}
            <a href="#" className="text-primary" onClick={() => setIsSignIn(!isSignIn)}>
              {isSignIn ? "Sign Up" : "Sign In"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import "../assets/css/LoginPage.css";
import Logo from "../assets/images/logo.png";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in both email and password fields.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      localStorage.setItem('token', data.data);

      const decodedToken = jwtDecode(data.data);
      if (decodedToken.role === 'receptionist') {
        navigate('/reception');
      } else if (decodedToken.role === 'doctor') {
        navigate('/doctor');
      } else if (decodedToken.role === 'admin') {
        navigate('/admin');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
  <div className="login-box">
    {/* Logo Section */}
    <div className="logo-container">
      <img src={Logo} alt="Clinic Logo" className="clinic-logo" />
    </div>
    {/* Header Section */}
    <div className="login-header">
      <h2>Welcome to Clinic Management System</h2>
      <p>Please log in to continue</p>
    </div>
    {/* Login Form */}
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  </div>
</div>
  );
}

export default LoginPage;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import "../assets/css/ReceptionPage.css";
import logo from "../assets/images/logo.png";
import AssignedPatientList from "../components/AssignedPatientList";

const Reception = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
    
    const { role } = jwtDecode(token);
    if (role !== 'doctor') navigate('/login');
  }, [navigate]);

  return (
    <>
    <div className="container">
    <aside className="sidebar">
        <div className="logo">
            <img src={logo} alt="logo" />
        </div>
        <nav className="nav-links">
            <a href="#" id="doctor-dashboard-link">Dashboard</a>
            <a href="#" id="doctor-patients-link">Patients</a>
        </nav>
        <button className="logout-btn">Logout</button>
    </aside>
    
          
          <main className="main-content">
            <header className="title-bar">
              <h1 className="title-text">Doctor Page</h1>
            </header>

            <AssignedPatientList />
          </main>
  </div>
</>
  );
};

export default Reception;

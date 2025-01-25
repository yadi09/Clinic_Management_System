import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import "../assets/css/ReceptionPage.css";
import AssignedPatientList from "../components/AssignedPatientList";
import Sidebar from "../components/Sidebar";

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
        <Sidebar />

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

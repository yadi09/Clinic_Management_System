import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img
        src="https://via.placeholder.com/100" 
        alt="Logo"
        className="logo"
      />
      <ul>
        <li>Dashboard</li>
        <li>Patient</li>
        <li>Login Page</li>
      </ul>
    </div>
  );
};

export default Sidebar;

import React from "react";
import "./Sidebar.css";
import Logo from "../assets/images/logo.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img
        src={Logo}
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

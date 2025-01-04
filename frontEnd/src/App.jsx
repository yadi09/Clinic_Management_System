import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Reception from "./pages/ReceptionPage";
import Doctor from "./pages/DoctorPage";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reception" element={<Reception />} />
        <Route path="/doctor" element={<Doctor />} />
      </Routes>
    </Router>
  );
}

export default App;

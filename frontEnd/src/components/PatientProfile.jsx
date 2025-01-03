import React, { useState, useEffect } from "react";
import "./PatientProfile.css";
import AssignPatient from "./AssignPatient";
import PatientProfileUpdateForm from "./PatientProfileUpdateForm";

const PatientProfile = ({ onClose, patient }) => { // patientId may be patient.id
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");

  const calculateAge = (date) => {
    const birthDate = new Date(date);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    setAge(calculatedAge);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
    calculateAge(e.target.value);
  };

  return (
    <div className="patient-profile-container">
      <div className="profile-header">
        <h2>Patient Profile</h2>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>

      <PatientProfileUpdateForm patient={patient} />

      <AssignPatient patientId={patient._Id} />
    </div>
  );
};

export default PatientProfile;

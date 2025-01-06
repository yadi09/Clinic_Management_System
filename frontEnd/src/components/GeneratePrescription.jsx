import React, { useState, useEffect } from "react";
import "./GeneratePrescription.css";
import axios from "axios";

const GeneratePrescription = ({ assignedPatient, medicalHistory, onClose }) => {
  const [formData, setFormData] = useState({
    medicalHistoryId: medicalHistory._id,
    forWho: "",
    RX: "",
  });

  console.log("prescription Medical History:", medicalHistory);
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("prescription Form Data Submitted:", formData);
    const response = await axios.post("http://localhost:3000/api/addPrescription", formData);
    console.log("prescription Response:", response);
    if (response.status !== 201) {
      alert("An error occurred while generating prescription. Please try again later.");
      return;
    } else {
    alert("Prescription generated successfully!");
    onClose();
    }
  };

  return (
    <div className="generate-prescription">
      {/* Header */}
      <div className="header">
        <h2>Generate Prescription</h2>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>

      {/* Patient Info */}
      <div className="patient-info">
        <div><strong>Name:</strong> {assignedPatient.patient.name}</div>
        <div><strong>Student ID:</strong> {assignedPatient.patient.studentId}</div>
        <div><strong>Card Number:</strong> {assignedPatient.patient.cardNumber}</div>
        <div><strong>Age:</strong> {assignedPatient.patient.age}</div>
        <div><strong>Gender:</strong> {assignedPatient.patient.gender}</div>
      </div>

      {/* Form Section */}
      <form className="prescription-form" onSubmit={handleSubmit}>
        <label>
          For Who:
          <select name="forWho" value={formData.forWho} onChange={handleChange}>
            <option value="">Select</option>
            <option value="student">Student</option>
            <option value="staff">Staff</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          RX:
          <textarea
            name="RX"
            value={formData.RX}
            onChange={handleChange}
            placeholder="Enter prescription details"
            rows="5"
          />
        </label>
        <button type="submit" className="btn-submit">
          Generate Prescription
        </button>
      </form>
    </div>
  );
};

export default GeneratePrescription;

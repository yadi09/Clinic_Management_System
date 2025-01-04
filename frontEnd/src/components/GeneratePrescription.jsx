import React, { useState } from "react";
import "./GeneratePrescription.css";

const GeneratePrescription = ({ patient, onClose }) => {
  const [formData, setFormData] = useState({
    forWho: "student",
    rx: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add logic to send form data to the backend
    alert("Prescription generated successfully!");
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
        <div><strong>Name:</strong> {patient.name}</div>
        <div><strong>Student ID:</strong> {patient.studentId}</div>
        <div><strong>Card Number:</strong> {patient.cardNumber}</div>
        <div><strong>Age:</strong> {patient.age}</div>
        <div><strong>Gender:</strong> {patient.gender}</div>
      </div>

      {/* Form Section */}
      <form className="prescription-form" onSubmit={handleSubmit}>
        <label>
          For Who:
          <select name="forWho" value={formData.forWho} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="staff">Staff</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          RX:
          <textarea
            name="rx"
            value={formData.rx}
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

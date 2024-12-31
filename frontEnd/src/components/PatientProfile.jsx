import React, { useState } from "react";
import "./PatientProfile.css";

const PatientProfile = ({ onClose }) => {
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

      <form className="update-form">
        <h3>Update Patient Information</h3>
        <div className="form-row">
          <label>Name</label>
          <input type="text" placeholder="Name" />
        </div>
        <div className="form-row">
          <label>Card No</label>
          <input type="text" placeholder="Card No" />
        </div>
        <div className="form-row">
          <label>Student ID</label>
          <input type="text" placeholder="Student ID" />
        </div>
        <div className="form-row">
          <label>Sex</label>
          <select>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-row">
          <label>Date of Birth</label>
          <input type="date" value={dob} onChange={handleDobChange} />
        </div>
        <div className="form-row">
          <label>Age</label>
          <input type="text" value={age} readOnly />
        </div>
        <div className="form-row">
          <label>Address Region</label>
          <input type="text" placeholder="Region" />
        </div>
        <div className="form-row">
          <label>Wereda/Sub City</label>
          <input type="text" placeholder="Wereda/Sub City" />
        </div>
        <div className="form-row">
          <label>Kebele</label>
          <input type="text" placeholder="Kebele" />
        </div>
        <div className="form-row">
          <label>House Number</label>
          <input type="text" placeholder="House Number" />
        </div>
        <div className="form-row">
          <label>Phone Number</label>
          <input type="text" placeholder="Phone Number" />
        </div>
        <button type="submit" className="update-btn">Update</button>
      </form>

      <form className="assign-doctor-form">
        <h3>Assign Patient to Doctor</h3>
        <div className="form-row">
          <label>Assign to Doctor</label>
          <select>
            <option value="">Select Doctor</option>
            <option value="doctor1">Dr. John Doe</option>
            <option value="doctor2">Dr. Jane Smith</option>
          </select>
        </div>
        <button type="submit" className="assign-btn">Assign</button>
      </form>
      <br />
    </div>
  );
};

export default PatientProfile;

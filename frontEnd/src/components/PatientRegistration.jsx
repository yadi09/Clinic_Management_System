import React, { useState } from "react";
import "./PatientRegistration.css";

const PatientRegistration = ({ closeRegistration }) => {
  const [formData, setFormData] = useState({
    registrationDate: new Date().toISOString().slice(0, 10), // Default to current date
    name: "",
    cardNo: "",
    studentId: "",
    sex: "",
    dob: "",
    region: "",
    wereda: "",
    kebele: "",
    houseNo: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Patient registered successfully!");
    closeRegistration();
  };

  return (
    <div className="patient-registration-container">
      <div className="registration-header">
        <h2>Patient Registration</h2>
        <button className="close-btn" onClick={closeRegistration}>X</button>
      </div>
        <hr />
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Date of Registration</label>
          <input
            type="date"
            name="registrationDate"
            value={formData.registrationDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Card No</label>
          <input
            type="text"
            name="cardNo"
            placeholder="Enter card number"
            value={formData.cardNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Student ID</label>
          <input
            type="text"
            name="studentId"
            placeholder="Enter student ID"
            value={formData.studentId}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label>Sex</label>
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-row">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Region</label>
          <input
            type="text"
            name="region"
            placeholder="Enter region"
            value={formData.region}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Wereda/Sub City</label>
          <input
            type="text"
            name="wereda"
            placeholder="Enter wereda or sub city"
            value={formData.wereda}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Kebele</label>
          <input
            type="text"
            name="kebele"
            placeholder="Enter kebele"
            value={formData.kebele}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>House Number</label>
          <input
            type="text"
            name="houseNo"
            placeholder="Enter house number"
            value={formData.houseNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="register-btn">Register</button>
      </form>
      <br/>
      <br/>
    </div>
  );
};

export default PatientRegistration;

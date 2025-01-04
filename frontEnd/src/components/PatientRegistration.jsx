import React, { useState } from "react";
import "./PatientRegistration.css";

const PatientRegistration = ({ closeRegistration }) => {
  const registrationDate = new Date().toISOString().slice(0, 10);

  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    dormitoryNumber: "",
    department: "",
    gender: "",
    age: "",
    region: "",
    wereda: "",
    kebele: "",
    houseNumber: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    let response;
    try {
      response = await fetch("http://localhost:3000/api/addPatient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("Response:", response);
    } catch (error) {
      console.error("Error registering patient:", error);
      alert("An error occurred while registering patient. Please try again later.");
      return;
    }

    console.log("Form submitted:", formData);
    if (response.status !== 201) {
      alert("An error occurred while registering patient. Please try again later.");
      return;
    } else {
      alert("Patient registered successfully");
      closeRegistration();
    }
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
          <label>Student ID</label>
          <input
            type="text"
            name="studentId"
            placeholder="Enter student ID"
            value={formData.studentId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Dorm Number</label>
          <input
            type="text"
            name="dormitoryNumber"
            placeholder="Enter dorm number"
            value={formData.dormitoryNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label>Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            >
            <option value="">Select</option>
            <option value="Education">Education</option>
            <option value="Educational Planning and Management">Educational Planning and Management</option>
            <option value="Curriculum and Instruction">Curriculum and Instruction</option>
            <option value="Educational Psychology">Educational Psychology</option>
            <option value="Special Needs Education">Special Needs Education</option>
            <option value="Adult Education and Community Development">Adult Education and Community Development</option>
            <option value="Early Childhood Care and Education">Early Childhood Care and Education</option>
            <option value="School Leadership">School Leadership</option>
            <option value="Teacher Education">Teacher Education</option>
            <option value="Distance Education">Distance Education</option>
            <option value="Higher Education">Higher Education</option>
            <option value="Technical and Vocational Education and Training">Technical and Vocational Education and Training</option>
            </select>
        </div>
        <div className="form-row">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-row">
          <label>Age</label>
          <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          min="0" // Optional: to ensure age is not negative
          placeholder="Enter your age"
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
          />
        </div>
        <div className="form-row">
          <label>House Number</label>
          <input
            type="text"
            name="houseNumber"
            placeholder="Enter house number"
            value={formData.houseNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Enter phone number"
            value={formData.phoneNumber}
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

import React, { useState, useEffect } from "react";
import "./PatientProfile.css";
import axios from "axios";

const PatientProfileUpdateForm = ({ patient }) => {
  const [patientData, setPatientData] = useState({
    name: "",
    cardNo: "",
    studentId: "",
    sex: "",
    dob: "",
    Region: "",
    wereda: "",
    kebele: "",
    houseNumber: "",
    phoneNumber: "",
  });
  const [age, setAge] = useState("");

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        console.log("1111", patient._id);
        const response = await axios.get(`http://localhost:3000/api/patients/${patient._id}`);
        console.log("22222", response.data);
        setPatientData(response.data);
        console.log("22222", patientData);
        calculateAge(response.data.dob);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, [patient._Id]);

  const calculateAge = (date) => {
    if (!date) return;
    const birthDate = new Date(date);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    setAge(calculatedAge);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({ ...prev, [name]: value }));

    if (name === "dob") {
      calculateAge(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/patients/${patient._id}`, patientData);
      alert("Patient information updated successfully!");
    } catch (error) {
      console.error("Error updating patient data:", error);
      alert("Failed to update patient information.");
    }
  };

  return (
    <form className="update-form" onSubmit={handleSubmit}>
      <h3>Update Patient Information</h3>
      <div className="form-row">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={patientData.name}
          onChange={handleChange}
          placeholder="Name"
        />
      </div>
      <div className="form-row">
        <label>Card No</label>
        <input
          type="text"
          name="cardNo"
          value={patientData.cardNumber}
          onChange={handleChange}
          placeholder="Card No"
        />
      </div>
      <div className="form-row">
        <label>Student ID</label>
        <input
          type="text"
          name="studentId"
          value={patientData.studentId}
          onChange={handleChange}
          placeholder="Student ID"
        />
      </div>
      <div className="form-row">
        <label>Gender</label>
        <select name="sex" value={patientData.gender} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="form-row">
        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={patientData.dob}
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <label>Age</label>
        <input type="text" value={age} placeholder="age" readOnly />
      </div>
      <div className="form-row">
        <label>Address Region</label>
        <input
          type="text"
          name="Region"
          value={patientData.Region}
          onChange={handleChange}
          placeholder="Region"
        />
      </div>
      <div className="form-row">
        <label>Wereda/Sub City</label>
        <input
          type="text"
          name="wereda"
          value={patientData.wereda}
          onChange={handleChange}
          placeholder="Wereda/Sub City"
        />
      </div>
      <div className="form-row">
        <label>Kebele</label>
        <input
          type="text"
          name="kebele"
          value={patientData.kebele}
          onChange={handleChange}
          placeholder="Kebele"
        />
      </div>
      <div className="form-row">
        <label>House Number</label>
        <input
          type="text"
          name="houseNumber"
          value={patientData.houseNumber}
          onChange={handleChange}
          placeholder="House Number"
        />
      </div>
      <div className="form-row">
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={patientData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
        />
      </div>
      <button type="submit" className="update-btn">
        Update
      </button>
    </form>
  );
};

export default PatientProfileUpdateForm;

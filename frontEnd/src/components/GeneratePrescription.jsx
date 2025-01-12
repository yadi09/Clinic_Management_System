import React, { useState, useEffect, useRef } from "react";
import "./GeneratePrescription.css";
import { useReactToPrint } from "react-to-print";
import PrescriptionForm from "./PrescriptionForm";
import axios from "axios";

const GeneratePrescription = ({ assignedPatient, medicalHistory, onClose }) => {
  const [currentMedicalHistory, setCurrentMedicalHistory] = useState(medicalHistory);
  const componentRef = useRef(null);
  const [formData, setFormData] = useState({
  medicalHistoryId: medicalHistory ? currentMedicalHistory._id : "",
  forWho: "",
  RX: "",
});

const handlePrint = useReactToPrint({
  contentRef: componentRef,
});

// Create new medical history if not already created
const NewMedicalHistory = async () => {
  if (!currentMedicalHistory) {
    console.log("assignedPatient.patient._id:", assignedPatient.patient._id);
    console.log("assignedPatient.doctor._id:", assignedPatient.doctor._id);
    try {
      const response = await axios.post("http://localhost:3000/api/addMedicalHistory", {
      "patientId" : assignedPatient.patient._id,
      "doctorId": assignedPatient.doctor._id,
      "presentHistory": "",
      "pastPresentHistory": "",
      "vitalSign": "",
      "physicalExamination": "",
      "diagnostics": [],
      "plan": "",
      "treatment": "",
      "status": "Active"
      });
      console.log("Response:", response);
      const newMedicalHistory = response?.data?.data;
      if (!newMedicalHistory) throw new Error("Invalid API response");
      console.log("New Medical History:", newMedicalHistory);
      console.log("New MedicalHistory _ID:", newMedicalHistory._id);
      setCurrentMedicalHistory(newMedicalHistory);
      console.log("Current Medical History:", currentMedicalHistory);
    } catch (error) {
      console.error("Error creating medical history:", error);
      alert("An error occurred while creating medical history. Please try again later.");
      return;
    }
  }
};

useEffect(() => {
  if (currentMedicalHistory) {
    setFormData((prev) => ({
      ...prev,
      medicalHistoryId: currentMedicalHistory._id,
    }));
    console.log("FormData Updated with Medical History ID:", currentMedicalHistory._id);
  }
}, [currentMedicalHistory]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!formData.forWho || !formData.RX) {
    //   alert("Please fill in all fields before submitting.");
    //   return;
    // }

    if (!currentMedicalHistory) {
      await NewMedicalHistory();
    }
    console.log("prescription Medical History:", currentMedicalHistory);

    console.log("prescription Form Data Submitted:", formData);
    try {
      if (currentMedicalHistory) {
        const response = await axios.post("http://localhost:3000/api/addPrescription", formData);
        if (response.status !== 201) throw new Error("Failed to generate prescription.");
        alert("Prescription generated successfully!");
        handlePrint();
      }
    } catch (error) {
      console.error("Error generating prescription:", error);
      alert("An error occurred while generating prescription. Please try again later.");
    }
  };

  return (
    <>
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
          <select name="forWho" value={formData.forWho} onChange={handleChange} required>
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
            required
          />
        </label>
        <button type="submit" className="btn-submit">
          Generate Prescription
        </button>
      </form>
    </div>

    {/* Prescription Form */}
    <div style={{ display: "none" }}>
      <PrescriptionForm ref={componentRef} patient={assignedPatient.patient} prescription={formData} />
      </div>
    </>
  );
};

export default GeneratePrescription;

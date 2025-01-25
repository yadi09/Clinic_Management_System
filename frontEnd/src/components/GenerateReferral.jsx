import React, { useRef, useState, useEffect } from "react";
import "./GenerateReferral.css";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import ReferralPrint from "./ReferralPrint";

const GenerateReferral = ({ assignedPatient, medicalHistory, onClose }) => {
  const [currentMedicalHistory, setCurrentMedicalHistory] = useState(medicalHistory);
  // const [newReferral, setNewReferral] = useState(null);
  let newReferral = null;
  const componentRef = useRef(null);
  const [formData, setFormData] = useState({
    medicalHistoryId: medicalHistory ? currentMedicalHistory._id : "",
    referralNo: "",
    referredTo: "",
    department: "",
    healthProblem: "",
    vitals: {
      bloodPressure: "",
      pulseRate: "",
      temperature: "",
      respiratoryRate: "",
    },
    tentativeDiagnosis: "",
    investigationResult: "",
    actionTaken: "",
    reasonForReferral: "",
  });

  const NewMedicalHistory = async () => {
    if (!currentMedicalHistory) {
      console.log("assignedPatient.patient._id:", assignedPatient.patient._id);
      console.log("assignedPatient.doctor._id:", assignedPatient.doctor._id);
      try {
        const response = await axios.post("http://localhost:3000/api/addMedicalHistory", {
          "patientId": assignedPatient.patient._id,
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
    if (name === "bloodPressure" || name === "pulseRate" || name === "temperature" || name === "respiratoryRate") {
      const vitals = { ...formData.vitals, [name]: value };
      setFormData({ ...formData, vitals });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    if (!currentMedicalHistory) {
      // await NewMedicalHistory();
      alert("Medical History is not created yet. Please create Medical History first.");
      onClose();
    }
    console.log("Medical History:", currentMedicalHistory);

    console.log("Form Data Submitted:", formData);
    try {
      if (currentMedicalHistory) {
        const response = await axios.post("http://localhost:3000/api/addReferral", formData);
        console.log("Response:", response);
        newReferral = response?.data?.data;
        if (!newReferral) throw new Error("Invalid API response");
        // setNewReferral(newReferral);
        console.log("New Referral:", newReferral);
        console.log("New Referral _ID:", newReferral._id);
        alert("Referral generated successfully!");
        handlePrint();
        onClose();
      } else {
        console.log("Medical History is creating...");
      }
      console.log("Printing Referral...:", newReferral);

    } catch (error) {
      console.error("Error creating referral:", error);
      return;
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  return (
    <>
      <div className="generate-referral">
        {/* Header */}
        <div className="header-referral">
          <h2>Generate Referral</h2>
          <button className="close-btn" onClick={onClose}>
            X
          </button>
        </div>

        {/* Form Section */}
        <form className="referral_form" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="row">
            <label>
              Card No:
              <input
                type="text"
                name="cardNo"
                value={assignedPatient.patient.cardNumber}
                onChange={handleChange}
              />
            </label>
            <label>
              Referral No:
              <input
                type="text"
                name="referralNo"
                value={formData.referralNo}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Referral Date:
              <input
                type="date"
                name="referralDate"
                value={formData.referralDate || new Date().toISOString().split("T")[0]}
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Row 2 */}
          <div className="row">
            <label>
              Referred To:
              <input
                type="text"
                name="referredTo"
                value={formData.referredTo}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Department:
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Row 3 */}
          <div className="row">
            <label>
              Name of Patient:
              <input
                type="text"
                name="patientName"
                value={assignedPatient.patient.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Age:
              <input
                type="text"
                name="age"
                value={assignedPatient.patient.age}
                onChange={handleChange}
              />
            </label>
            <label>
              Gender:
              <select
                name="gender"
                value={assignedPatient.patient.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>

          {/* Row 4 */}
          <div className="label">
            <label>
              Student ID:
              <input
                type="text"
                name="studentId"
                value={assignedPatient.patient.studentId}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="label">
            <label>
              Health Problem:
              <textarea
                name="healthProblem"
                value={formData.healthProblem}
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Row 5 */}
          <div className="row">
            <label>
              B/P:
              <input
                type="text"
                name="bloodPressure"
                value={formData.vitals.bloodPressure}
                onChange={handleChange}
              />
            </label>
            <label>
              P/R:
              <input
                type="text"
                name="pulseRate"
                value={formData.vitals.pulseRate}
                onChange={handleChange}
              />
            </label>
            <label>
              T/O:
              <input
                type="text"
                name="temperature"
                value={formData.vitals.temperature}
                onChange={handleChange}
              />
            </label>
            <label>
              R/R:
              <input
                type="text"
                name="respiratoryRate"
                value={formData.vitals.respiratoryRate}
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Other Inputs */}
          <div className="label">
            <label>
              Tentative Diagnosis:
              <textarea
                name="tentativeDiagnosis"
                value={formData.tentativeDiagnosis}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="label">
            <label>
              Investigation Result:
              <textarea
                name="investigationResult"
                value={formData.investigationResult}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="label">
            <label>
              Action Taken (Treatment Given):
              <textarea
                name="actionTaken"
                value={formData.actionTaken}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="label">
            <label>
              Reason for Referral:
              <textarea
                name="reasonForReferral"
                value={formData.referralReason}
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Submit Button */}

          <button type="submit" className="btn-submit">
            Submit
          </button>
        </form>
        <br />
        <br />
      </div>
      <div style={{ display: "none" }}>
        <ReferralPrint ref={componentRef} patient={assignedPatient.patient} referral={formData} />
      </div>
    </>
  );
};

export default GenerateReferral;
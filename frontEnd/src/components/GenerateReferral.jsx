import React, { useState } from "react";
import "./GenerateReferral.css";

const GenerateReferral = ({ assignedPatient, medicalHistory, onClose }) => {
  const [formData, setFormData] = useState({
    cardNo: "",
    referralNo: "",
    referralDate: "",
    referredTo: "",
    department: "",
    patientName: "",
    age: "",
    gender: "",
    studentId: "",
    healthProblem: "",
    bp: "",
    pr: "",
    to: "",
    rr: "",
    tentativeDiagnosis: "",
    investigationResult: "",
    actionTaken: "",
    referralReason: "",
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
    alert("Referral generated successfully!");
  };

  return (
    <div className="generate-referral">
      {/* Header */}
      <div className="header">
        <h2>Generate Referral</h2>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>

      {/* Form Section */}
      <form className="referral-form" onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="row">
          <label>
            Card No:
            <input
              type="text"
              name="cardNo"
              value={formData.cardNo}
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
            />
          </label>
          <label>
            Referral Date:
            <input
              type="date"
              name="referralDate"
              value={formData.referralDate}
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
              value={formData.patientName}
              onChange={handleChange}
            />
          </label>
          <label>
            Age:
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </label>
          <label>
            Gender:
            <select
              name="gender"
              value={formData.gender}
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
        <label>
          Student ID:
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
          />
        </label>

        <label>
          Health Problem:
          <textarea
            name="healthProblem"
            value={formData.healthProblem}
            onChange={handleChange}
          />
        </label>

        {/* Row 5 */}
        <div className="row">
          <label>
            B/P:
            <input
              type="text"
              name="bp"
              value={formData.bp}
              onChange={handleChange}
            />
          </label>
          <label>
            P/R:
            <input
              type="text"
              name="pr"
              value={formData.pr}
              onChange={handleChange}
            />
          </label>
          <label>
            T/O:
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
            />
          </label>
          <label>
            R/R:
            <input
              type="text"
              name="rr"
              value={formData.rr}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Other Inputs */}
        <label>
          Tentative Diagnosis:
          <textarea
            name="tentativeDiagnosis"
            value={formData.tentativeDiagnosis}
            onChange={handleChange}
          />
        </label>

        <label>
          Investigation Result:
          <textarea
            name="investigationResult"
            value={formData.investigationResult}
            onChange={handleChange}
          />
        </label>

        <label>
          Action Taken (Treatment Given):
          <textarea
            name="actionTaken"
            value={formData.actionTaken}
            onChange={handleChange}
          />
        </label>

        <label>
          Reason for Referral:
          <textarea
            name="referralReason"
            value={formData.referralReason}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="btn-submit">
          Submit
        </button>
      </form>
      <br/>
      <br/>
    </div>
  );
};

export default GenerateReferral;

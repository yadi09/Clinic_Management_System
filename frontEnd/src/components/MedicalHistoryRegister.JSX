import React, { useState } from 'react';
import './MedicalHistoryRegister.css'; // Include appropriate styles
import GeneratePrescription from './GeneratePrescription';
import GenerateReferral from './GenerateReferral';

const MedicalHistoryRegister = ({ patient, onClose }) => {
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [availableDiseases] = useState(["Flu", "Diabetes", "Hypertension", "Asthma", "COVID-19"]);
  const [showPrescription, setShowPrescription] = useState(false);
  const [showReferral, setShowReferral] = useState(false);

  const [formData, setFormData] = useState({
    presentHistory: "",
    pastPresentHistory: "",
    vitalSign: "",
    physicalExamination: "",
    diagnostics: [],
    plan: "",
    treatment: "",
    status: "",
  });

  const handleDiseaseSelect = (disease) => {
    if (!selectedDiseases.includes(disease)) {
      setSelectedDiseases([...selectedDiseases, disease]);
    }
  };

  const handleDiseaseRemove = (disease) => {
    setSelectedDiseases(selectedDiseases.filter((item) => item !== disease));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here
    console.log("Form data submitted:", { ...formData, diagnostics: selectedDiseases });
  };

  return (
    <>
    {showPrescription ? (
      <GeneratePrescription
          patient={patient}
          onClose={() => setShowPrescription(false)}
        />
    ) : showReferral ? (
      <GenerateReferral
          patient={patient}
          onClose={() => setShowReferral(false)}
        />
    ) : (
      <div className="medical-history-register">
      {/* Header Section */}
      <div className="register-header">
        <h2>Add New Medical History</h2>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>

      {/* Patient Info Section */}
        <div className="patient-info">
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Card Number:</strong> {patient.cardNumber}</p>
          <p><strong>Student ID:</strong> {patient.studentId}</p>
        </div>


      {/* Form Section */}
      <div className="form-section">
        {/* Buttons at the top-right corner */}
        <div className="form-header">
          <div className="buttons">
            <button 
            className="btn btn-prescription" 
            onClick={() => setShowPrescription(true)}
            >Generate Prescription</button>
            <button 
            className="btn btn-referral"
            onClick={() => setShowReferral(true)}
            >Generate Referrals</button>
          </div>
        </div>
        {/* Form */}
      <form className="medical-history-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Present History</label>
          <textarea
            name="presentHistory"
            value={formData.presentHistory}
            onChange={handleInputChange}
            placeholder="Describe present history..."
          ></textarea>
        </div>
        <div className="form-group">
          <label>Past Present History</label>
          <textarea
            name="pastPresentHistory"
            value={formData.pastPresentHistory}
            onChange={handleInputChange}
            placeholder="Describe past present history..."
          ></textarea>
        </div>
        <div className="form-group">
          <label>Vital Sign</label>
          <textarea
            name="vitalSign"
            value={formData.vitalSign}
            onChange={handleInputChange}
            placeholder="Enter vital signs..."
          ></textarea>
        </div>
        <div className="form-group">
          <label>Physical Examination</label>
          <textarea
            name="physicalExamination"
            value={formData.physicalExamination}
            onChange={handleInputChange}
            placeholder="Describe physical examination..."
          ></textarea>
        </div>
        <div className="form-group">
          <label>Diagnostics</label>
          <select onChange={(e) => handleDiseaseSelect(e.target.value)}>
            <option value="">Select a disease...</option>
            {availableDiseases.map((disease) => (
              <option key={disease} value={disease}>
                {disease}
              </option>
            ))}
          </select>
          <div className="selected-diseases">
            {selectedDiseases.map((disease) => (
              <span key={disease} className="selected-disease">
                {disease} <button onClick={() => handleDiseaseRemove(disease)}>x</button>
              </span>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Plan</label>
          <textarea
            name="plan"
            value={formData.plan}
            onChange={handleInputChange}
            placeholder="Enter treatment plan..."
          ></textarea>
        </div>
        <div className="form-group">
          <label>Treatment</label>
          <textarea
            name="treatment"
            value={formData.treatment}
            onChange={handleInputChange}
            placeholder="Describe treatment..."
          ></textarea>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="">Select status...</option>
            <option value="Appointment">Appointment</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-submit">Submit</button>
      </form>
    </div>
    </div>
    )
    }
  
    </>
  );
};

export default MedicalHistoryRegister;

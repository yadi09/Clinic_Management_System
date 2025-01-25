import React, { useState } from 'react';
import './MedicalHistoryRegister.css'; // Include appropriate styles
import GeneratePrescription from './GeneratePrescription';
import GenerateReferral from './GenerateReferral';
import axios from 'axios';

const MedicalHistoryRegister = ({ assignedPatient, onClose }) => {
    const [selectedDiseases, setSelectedDiseases] = useState([]);
    const [availableDiseases] = useState(["Flu", "Diabetes", "Hypertension", "Asthma", "COVID-19"]);
    const [showPrescription, setShowPrescription] = useState(false);
    const [showReferral, setShowReferral] = useState(false);
    const [medicalHistory, setMedicalHistory] = useState(null);

    if (!assignedPatient) {
        return <div>Loading...</div>;
    }
    console.log("111111111 assignedPatient:", assignedPatient);
    console.log("222222222 Doctor:", assignedPatient.doctor);
    const [formData, setFormData] = useState({
        patientId: assignedPatient.patient._id,
        doctorId: assignedPatient.doctor._id,
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

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Implement form submission logic here
        if (medicalHistory) {
            alert("Medical history already registered for this patient");
            return;
        }
        try {
            console.log("Form data to be submitted:", { ...formData, diagnostics: selectedDiseases });
            const response = await axios.post("http://localhost:3000/api/addMedicalHistory", formData);
            console.log("Response:", response);
            if (response.status !== 201) {
                alert("An error occurred while submitting the form. Please try again later.");
                return;
            }
            alert("Medical history registered successfully");
            setMedicalHistory(response.data.data);
            console.log("Medical history:", response.data.data);
            // onClose();
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred while submitting the form. Please try again later.");
            return;
        }
        console.log("Form data submitted:", { ...formData, diagnostics: selectedDiseases });
    };

    return (
        <>
            {showPrescription ? (
                <GeneratePrescription
                    assignedPatient={assignedPatient}
                    medicalHistory={medicalHistory}
                    onClose={() => setShowPrescription(false)}
                />
            ) : showReferral ? (
                <GenerateReferral
                    assignedPatient={assignedPatient}
                    medicalHistory={medicalHistory}
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
                        <p><strong>Name:</strong> {assignedPatient.patient.name}</p>
                        <p><strong>Card Number:</strong> {assignedPatient.patient.cardNumber}</p>
                        <p><strong>Student ID:</strong> {assignedPatient.patient.studentId}</p>
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
                                    required
                                >
                                    <option value="">Select status...</option>
                                    <option value="Appointed">Appointed</option>
                                    <option value="Referred">Referred</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
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

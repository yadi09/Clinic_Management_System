import React, { useState } from 'react';
import './DpatientProfile.css'; // Import a CSS file for styling
import MedicalHistory from './MedicalHistory';

const PatientProfile = ({ assignedPatient, onClose }) => {
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);

  // Mock data for in-progress medical history
  const medicalHistory = [
    { id: 1, doctor: "Dr. Smith", date: "2024-01-05", status: "In Progress" },
    { id: 2, doctor: "Dr. Adams", date: "2024-01-10", status: "In Progress" },
    { id: 3, doctor: "Dr. Johnson", date: "2024-01-15", status: "In Progress" },
  ];

  console.log("00000 Assigned patient:", assignedPatient);

  const handleOpenMedicalHistory = () => {
    setShowMedicalHistory(true);
  };

  const handleViewHistory = (id) => {
    // Implement the logic to view the history details
    console.log(`Viewing history with ID: ${id}`);
  };

  const handleCloseMedicalHistory = () => {
    setShowMedicalHistory(false);
  };

  // Function to calculate age from date of birth
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <>
    {showMedicalHistory ? (
      <MedicalHistory
        assignedPatient={assignedPatient}
        onClose={handleCloseMedicalHistory}
      />
    ) : (
      <div className="patient-profile">
      {/* Header Section */}
      <div className="profile-header">
        <h2>Patient Profile Page</h2>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>

      {/* Patient Information Section */}
      <div className="patient-info">
        <div className="info-group">
          <div><strong>Date of Registration:</strong> {assignedPatient.patient.createdAt}</div>
          <div><strong>Name:</strong> {assignedPatient.patient.name}</div>
        </div>
        <div className="info-group">
          <div><strong>Card Number:</strong> {assignedPatient.patient.cardNumber}</div>
          <div><strong>Student ID:</strong> {assignedPatient.patient.studentId}</div>
        </div>
        <div className="info-group">
          <div><strong>Gender:</strong> {assignedPatient.patient.gender}</div>
          <div><strong>Date of Birth:</strong> {assignedPatient.patient.age}</div>
          <div><strong>Age:</strong> {calculateAge(assignedPatient.patient.dob)}</div>
        </div>
        <div className="info-group">
          <div><strong>Region:</strong> {assignedPatient.patient.region}</div>
          <div><strong>Wereda/Sub City:</strong> {assignedPatient.patient.wereda}</div>
        </div>
        <div className="info-group">
          <div><strong>Kebele:</strong> {assignedPatient.patient.kebele}</div>
          <div><strong>House Number:</strong> {assignedPatient.patient.houseNumber}</div>
          <div><strong>Phone Number:</strong> {assignedPatient.patient.phoneNumber}</div>
        </div>
        <button 
        className="btn-medical-history"
        onClick={handleOpenMedicalHistory}
        >Click to See Medical History</button>
      </div>

      {/* In-progress Medical History Section */}
      <div className="medical-history">
        <h3>In Progress Medical History of the Patient</h3>
        <table className="history-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {medicalHistory.map((history) => (
              <tr key={history.id}>
                <td>{history.id}</td>
                <td>{history.doctor}</td>
                <td>{history.date}</td>
                <td>{history.status}</td>
                <td>
                  <button
                    className="btn btn-view"
                    onClick={() => handleViewHistory(history.id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )}
    </>
  );
};

export default PatientProfile;

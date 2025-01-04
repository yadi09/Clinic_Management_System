import React from "react";
import "./MedicalHistory.css";

const MedicalHistory = ({ patient, onClose }) => {
  const medicalHistories = [
    { id: 1, date: "2024-01-05", diagnosis: "Flu", doctor: "Dr. Smith" },
    { id: 2, date: "2024-01-12", diagnosis: "Allergy", doctor: "Dr. Adams" },
  ];

  const handleViewDetail = (historyId) => {
    alert(`Viewing details for medical history ID: ${historyId}`);
  };

  const handleCreateNew = () => {
    alert("Creating a new medical history entry.");
  };

  return (
    <div className="medical-history-page">
      <div className="page-header">
        <h2>Medical History Page</h2>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>
      <div className="patient-info">
        <div>
          <strong>Name:</strong> {patient.name || "N/A"}
        </div>
        <div>
          <strong>Card Number:</strong> {patient.cardNumber || "N/A"}
        </div>
        <div>
          <strong>Student ID:</strong> {patient.studentId || "N/A"}
        </div>
      </div>
      <div className="medical-history-section">
        <button className="btn-create" onClick={handleCreateNew}>
          Create New Medical History
        </button>
        <table className="history-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Diagnosis</th>
              <th>Doctor</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {medicalHistories.map((history) => (
              <tr key={history.id}>
                <td>{history.id}</td>
                <td>{history.date}</td>
                <td>{history.diagnosis}</td>
                <td>{history.doctor}</td>
                <td>
                  <button
                    className="btn btn-view"
                    onClick={() => handleViewDetail(history.id)}
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
  );
};

export default MedicalHistory;

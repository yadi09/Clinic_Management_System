import React, { useState } from 'react';
import PatientRegistration from './PatientRegistration';
import PatientProfile from './PatientProfile';

const patients = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleViewClick = (patient) => {
    setSelectedPatient(patient); // Pass the patient data to the profile page
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
    setSelectedPatient(null);
  };

  const patientList = [
    { id: 1, name: 'John Doe', department: 'Cardiology', year: '3rd Year' },
    { id: 2, name: 'Jane Smith', department: 'Neurology', year: '2nd Year' },
  ];

  return (
    <>
      <div id="search-bar-section" className="search-bar-section hidden">
        <input type="text" className="search-bar" placeholder="Search for a patient..." />
      </div>

      <section id="patients-section" className="content hidden">
        <div className="patients-actions">
          <div className="action-buttons">
            <button className="btn btn-delete">Delete</button>
            <button className="btn btn-register" onClick={() => setShowRegistration(true)}>
              Register New
            </button>
          </div>
          <div className="patients-list">
            <table className="patients-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patientList.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.id}</td>
                    <td>{patient.name}</td>
                    <td>{patient.department}</td>
                    <td>{patient.year}</td>
                    <td>
                      <button className="btn btn-view" onClick={() => handleViewClick(patient)}>
                        View
                      </button>
                      <button className="btn btn-edit">Edit</button>
                      <button className="btn btn-delete">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Show PatientRegistration component */}
      {showRegistration && (
        <PatientRegistration closeRegistration={() => setShowRegistration(false)} />
      )}

      {/* Show PatientProfile component */}
      {showProfile && selectedPatient && (
        <PatientProfile
          patient={selectedPatient} // Pass selected patient details
          onClose={handleCloseProfile}
        />
      )}
    </>
  );
};

export default patients;

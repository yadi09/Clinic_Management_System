import React, { useState, useEffect } from 'react';
import PatientRegistration from './PatientRegistration';
import PatientProfile from './PatientProfile';
import axios from 'axios';

const patients = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    // Fetch patient data from the server
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/patients');
        setPatientData(response.data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    }
    fetchPatients();
  }, []);

  const handleViewClick = (patient) => {
    setSelectedPatient(patient); // Pass the patient data to the profile page
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
    setSelectedPatient(null);
  };

  // const handleDelete = async () => {
  //   try {
  //     await axios.delete(`http://localhost:3000/api/patients/${selectedPatient._id}`);
  //     setPatientData(patientData.filter((patient) => patient._id !== selectedPatient._id));
  //     handleCloseProfile();
  //   } catch (error) {
  //     console.error('Error deleting patient:', error);
  //   }
  // }
  

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
                  <th>Card Number</th>
                  <th>Name</th>
                  <th>Student ID</th>
                  <th>age</th>
                  <th>Gender</th>
                  <th>Department</th>
                  {/* <th>Year</th> */}
                  {/* <th>status</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patientData.map((patient) => (
                  <tr key={patient._id}>
                    <td>{patient.cardNumber}</td>
                    <td>{patient.name}</td>
                    <td>{patient.studentId}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.department}</td>
                    {/* <td>{patient.year}</td> */}
                    {/* <td>{patient.status}</td> */}
                    <td>
                      <button className="btn btn-view" onClick={() => handleViewClick(patient)}>
                        View
                      </button>
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

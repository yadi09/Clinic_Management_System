import React, { useState, useEffect } from 'react';
import PatientProfile from './DpatientProfile';

const AssignedPatientList = ({ onViewPatient }) => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);


  // Simulate fetching data from the database
  useEffect(() => {
    const fetchPatients = async () => {
      // Mocked data (replace this with an API/database call)
      fetch("http://localhost:3000/api/getAssignedPatients")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPatients(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchPatients();
  }, []);

  return (
    <section id="assigned-patients-section" className="content">
      <h2 className="section-title">Assigned Patients</h2>
      <div className="patients-list">
        <table className="patients-table">
          <thead>
            <tr>
              <th>Card Number</th>
              <th>Name</th>
              <th>Student ID</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.patient.cardNumber}</td>
                  <td>{patient.patient.name}</td>
                  <td>{patient.patient.studentId}</td>
                  <td>{patient.patient.gender}</td>
                  <td>
                    <button
                      className="btn btn-view"
                      onClick={() => setSelectedPatient(patient.patient)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No assigned patients found.</td>
              </tr>
            )}

            {selectedPatient && (
              <PatientProfile
                patient={selectedPatient}
                onClose={() => setSelectedPatient(null)}
              />
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AssignedPatientList;

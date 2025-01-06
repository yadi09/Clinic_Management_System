import React, { useState, useEffect } from 'react';
import PatientProfile from './DpatientProfile';

const AssignedPatientList = ({ onViewPatient }) => {
  const [patients, setPatients] = useState([]);
  const [assignedPatient, setSelectedPatient] = useState(null);


  // Simulate fetching data from the database
  useEffect(() => {
    const fetchPatients = async () => {
      // Mocked data (replace this with an API/database call)
      fetch("http://localhost:3000/api/getAssignedPatients")
        .then((res) => res.json())
        .then((data) => {
          console.log("assigned patient:", data);
          setPatients(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchPatients();
  }, []);
  console.log("To see if this data has doctor name:", patients);

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
                console.log("--00 selected patient:", patients),
                <tr key={index}>
                  <td>{patient.patient.cardNumber}</td>
                  <td>{patient.patient.name}</td>
                  <td>{patient.patient.studentId}</td>
                  <td>{patient.patient.gender}</td>
                  <td>
                    <button
                      className="btn btn-view"
                      onClick={() => {
                        console.log("00 selected patient:", patient);
                        console.log("22 selected patient:", index);
                        setSelectedPatient(patient);
                        console.log("11 selected patient:", assignedPatient);
                      } }
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

            {assignedPatient && (
              console.log("33 selected patient:", assignedPatient),
              <PatientProfile
                assignedPatient={assignedPatient}
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

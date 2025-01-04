import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AssignPatient = ({ patientId }) => {
    const [doctorId, setDoctorId] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState("");

    const assignDoctor = (e) => {
        setSelectedDoctor(e.target.value);
        setDoctorId(e.target.value);
      };

      useEffect(() => {
        fetch("http://localhost:3000/api/getDoctors")
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setDoctors(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

    const assignPatient = async () => {
        if (!doctorId) {
          alert('Please select a doctor.');
          return;
        }
    
        try {
          console.log('Assigning patient to doctor:', patientId, doctorId);
          const response = await axios.post('http://localhost:3000/api/assign-patient', {
            patientId,
            doctorId,
          });
          alert('Patient assigned to doctor');
        } catch (error) {
          console.error(error);
          alert(error.response?.data?.message || 'Failed to assign patient.');
        }
      };

  return (
    <>
    <form className="assign-doctor-form">
        <h3>Assign Patient to Doctor</h3>
        <div className="form-row">
          <label>Assign to Doctor</label>
          <select id="doctor" value={selectedDoctor} onChange={assignDoctor}>
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>
        <button type="button" className="assign-btn" onClick={assignPatient}>Assign</button>
      </form>
      <br />
    </>
  )
}

export default AssignPatient
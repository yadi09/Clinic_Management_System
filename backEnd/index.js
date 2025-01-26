import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import patientRouter from './routes/patient.js';
import doctorRouter from './routes/doctor.js';
import assignPatientRouter from './routes/asignPatient.js';
import patientsRouter from './routes/patients.js';
import assignedPatientRouter from './routes/asignedPatient.js';
import addMedicalHistoryRouter from './routes/addMedicalHistory.js';
import addDiseaseRouter from './routes/addDisease.js';
import addPrescriptionRouter from './routes/addPrescription.js';
import addReferralRouter from './routes/addReferral.js';
import getMedicalHistoryRouter from './routes/getMedicalHistory.js';
import removeAssignPatientRouter from './routes/removeAssignPatient.js';
// import config from 'config';

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/addUser', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/addPatient', patientRouter);
app.use('/api/getDoctors', doctorRouter);
app.use('/api/assign-patient', assignPatientRouter);
app.use('/api/patients', patientsRouter);
app.use('/api/getAssignedPatients', assignedPatientRouter);
app.use('/api/addMedicalHistory', addMedicalHistoryRouter);
app.use('/api/addDisease', addDiseaseRouter);
app.use('/api/addPrescription', addPrescriptionRouter);
app.use('/api/addReferral', addReferralRouter);
app.use('/api/getMedicalHistory', getMedicalHistoryRouter);
app.use('/api/removeAssignPatient', removeAssignPatientRouter);

// Port
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
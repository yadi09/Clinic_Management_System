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


// Port
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
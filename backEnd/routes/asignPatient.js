import express from 'express';
import { User } from '../models/user.js';
import { Patient } from '../models/patient.js';
import { PatientQueue } from '../models/patient_queue.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { patientId, doctorId } = req.body;

    try {
        const patient = await Patient.findById(patientId);
        if (!Patient) {
            return res.status(404).send({ message: 'Patient not found' });
        }

        const doctor = await User.findById(doctorId);
        if (!doctor || doctor.role !== 'doctor') {
            return res.status(404).send({ message: 'Doctor not found' });
        }

        // check if patient is already in queue
        const existingQueue = await PatientQueue.findOne({ patient: patientId });
        if (existingQueue) {
            return res.status(400).send({ message: 'Patient already in queue' });
        }

        const newQueue = new PatientQueue({
            patient: patientId,
            doctor: doctorId,
        });
        await newQueue.save();

        res.status(201).send({ message: 'Patient assigned to doctor' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

export default router;
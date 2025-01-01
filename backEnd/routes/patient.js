import express from 'express';
import { Patient, validatePatient } from '../models/patient.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { error } = validatePatient(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const existingPatient = await Patient.findOne({ studentId: req.body.studentId });
        if (existingPatient) return res.status(400).send({ message: 'Patient with this student ID already exists' });

        const patient = new Patient(req.body);
        await patient.save();
        
        res.status(201).send({ message: 'Patient registered successfully', patient });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

export default router;
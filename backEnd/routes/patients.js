import express from 'express';
import { Patient } from '../models/patient.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).send(patients);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).send({ message: 'Patient not found' });

        res.status(200).send(patient);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log("4444", patient);
        if (!patient) return res.status(404).send({ message: 'Patient not found' });

        res.status(200).send({ message: 'Patient information updated successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

export default router;

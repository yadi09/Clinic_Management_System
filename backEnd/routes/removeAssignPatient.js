import express from 'express';
import { PatientQueue } from '../models/patient_queue.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { id } = req.body;
    console.log("Assigned 0000 Patient:", id);

    try {
        const patient = await PatientQueue.findOne({ patient: id });
        console.log("Patient:", patient);
        if (!patient) {
            return res.status(404).send({ message: 'Patient not found' });
        }
        if (!patient) {
            return res.status(404).send({ message: 'Patient not found' });
        }

        await PatientQueue.findByIdAndDelete(patient._id);

        res.status(200).send({ message: 'Patient removed from the queue' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

export default router;
import express from 'express';
import MedicalHistory from '../models/MedicalHistory.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const medicalHistory = new MedicalHistory(req.body);
        await medicalHistory.save();
        res.status(201).send({ message: 'Medical history created successfully', data: medicalHistory });
    } catch (error) {
        console.error("Error submitting form:", error);
        res.status(500).send(error);
    }
    });

export default router;

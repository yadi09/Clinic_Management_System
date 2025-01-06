import express from 'express';
import disease from '../models/disease.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const Disease = new disease(req.body);
        await Disease.save();
        res.status(201).send({ message: 'Disease created successfully', data: Disease });
    } catch (error) {
        console.error("Error submitting form:", error);
        res.status(500).send(error);
    }
    });

export default router;
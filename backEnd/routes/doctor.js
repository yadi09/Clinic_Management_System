import express from 'express';
import { User } from '../models/user.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const doctors = await User.find({ role: "doctor" });
        if (doctors.length === 0) {
            return res.status(404).send({ message: 'No doctors found' });
        }
        res.status(200).send(doctors);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

export default router;

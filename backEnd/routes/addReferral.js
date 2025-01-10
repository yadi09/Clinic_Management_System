import express from 'express';
import Referral from '../models/referral.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newReferral = new Referral(req.body);
        const savedReferral = await newReferral.save();
        res.status(200).send({ message: 'Referral generated successfully', data: savedReferral });
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

export default router;
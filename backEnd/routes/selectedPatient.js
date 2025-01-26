import express from 'express';
import Patient from '../models/patient.js';

const router = express.Router();

router.delete('/', (req, res) => {
  const { _id } = req.body;
  Patient.findByIdAndDelete(_id, (err, result) => {
    if (err) {
        return res.status(500).send(err);
    }
    if (!result) {
        return res.status(404).send('Patient not found');
    }
    res.status(200).send('Patient deleted successfully');
    });
});
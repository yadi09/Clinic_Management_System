import express from 'express';
import MedicalHistory from '../models/MedicalHistory.js';
import mongoose from 'mongoose';

const router = express.Router();

// Route to get all medical history records
router.get('/', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: 'Patient ID is required' });
  }
  try {
    const objectId = new mongoose.Types.ObjectId(id);
    console.log(objectId);
    const existMedicalHistory = await MedicalHistory.find({ patientId: objectId })
    .populate('patientId').populate('doctorId');
    if (existMedicalHistory.length === 0) {
      return res.status(404).json({ message: 'Medical history not found' });
    }
    res.send({data: existMedicalHistory, message: 'Medical history found'});
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
});

export default router;

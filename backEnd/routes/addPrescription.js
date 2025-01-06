import express from "express";
import Prescription from "../models/prescription.js";

const router = express.Router();

// Add a new prescription
router.post("/", async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    await prescription.save();
    res.status(201).send({ message: "Prescription generated successfully", data: prescription });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
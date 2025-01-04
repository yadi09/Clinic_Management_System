import express from "express";
import { PatientQueue } from "../models/patient_queue.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const patients = await PatientQueue.find().populate("patient").populate("doctor");
    res.status(200).send(patients);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;

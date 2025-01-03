import mongoose from "mongoose";

const patientQueueSchema = new mongoose.Schema(
    {
        patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
        },
        doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
        },
        status: {
        type: String,
        enum: ["waiting", "in-consultation", "completed"],
        default: "waiting",
        },
    },
    {
        timestamps: true,
    }
    );

const PatientQueue = mongoose.model("PatientQueue", patientQueueSchema);

export { PatientQueue };

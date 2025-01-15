import mongoose from 'mongoose';

// Define the MedicalHistory schema
const medicalHistorySchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    presentHistory: {
      type: String,
      required: false, // Optional field
      trim: true,
    },
    pastPresentHistory: {
      type: String,
      required: false, // Optional field
      trim: true,
    },
    vitalSign: {
      type: String,
      required: false, // Optional field
      trim: true,
    },
    physicalExamination: {
      type: String,
      required: false, // Optional field
      trim: true,
    },
    diagnostics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disease', // Reference to the Disease collection
        required: false,
      },
    ],
    plan: {
      type: String,
      required: false, // Optional field
      trim: true,
    },
    treatment: {
      type: String,
      required: false, // Optional field
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Cancelled', 'Referred', 'Appointed', 'Completed'],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the MedicalHistory model
const MedicalHistory = mongoose.model('MedicalHistory', medicalHistorySchema);

export default MedicalHistory;

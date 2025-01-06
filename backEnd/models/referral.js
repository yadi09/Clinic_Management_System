import mongoose from 'mongoose';

// Define the Referral schema
const referralSchema = new mongoose.Schema(
  {
    medicalHistoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MedicalHistory',
      required: true,
    },
    referralNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    referredTo: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    healthProblem: {
      type: String,
      required: true,
      trim: true,
    },
    vitals: {
      bloodPressure: {
        type: String,
        required: true,
        trim: true,
        // Example: "120/80"
      },
      pulseRate: {
        type: Number,
        required: true,
        // Example: 72
      },
      temperature: {
        type: Number,
        required: true,
        // Example: 36.5 (in °C)
      },
      respiratoryRate: {
        type: Number,
        required: true,
        // Example: 16
      },
    },
    tentativeDiagnosis: {
      type: String,
      required: false,
      trim: true,
    },
    investigationResult: {
      type: String,
      required: false,
      trim: true,
    },
    actionTaken: {
      type: String,
      required: false,
      trim: true,
    },
    reasonForReferral: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Referral model
const Referral = mongoose.model('Referral', referralSchema);

export default Referral;

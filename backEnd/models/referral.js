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
      required: false,
      trim: true,
      default: 'Not specified',
    },
    healthProblem: {
      type: String,
      required: false,
      trim: true,
      default: 'Not specified',
    },
    vitals: {
      bloodPressure: {
        type: String,
        required: false,
        trim: true,
        default: '-/-',
        // Example: "120/80"
      },
      pulseRate: {
        type: String,
        required: false,
        trim: true,
        default: '-',
        // Example: 72
      },
      temperature: {
        type: String,
        required: false,
        trim: true,
        default: '-',
        // Example: 36.5 (in °C)
      },
      respiratoryRate: {
        type: String,
        required: false,
        trim: true,
        default: 'Not specified',
        // Example: 16
      },
    },
    tentativeDiagnosis: {
      type: String,
      required: false,
      trim: true,
      default: 'Not specified',
    },
    investigationResult: {
      type: String,
      required: false,
      trim: true,
      default: 'Not specified',
    },
    actionTaken: {
      type: String,
      required: false,
      trim: true,
      default: 'Not specified',
    },
    reasonForReferral: {
      type: String,
      required: false,
      trim: true,
      default: 'Not specified',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Referral model
const Referral = mongoose.model('Referral', referralSchema);

export default Referral;

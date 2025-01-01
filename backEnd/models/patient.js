import mongoose from 'mongoose';
import Joi from 'joi';
import AutoIncrementFactory from 'mongoose-sequence';

// Use the default connection for auto-increment
const AutoIncrement = AutoIncrementFactory(mongoose.connection);

// Define a schema
const patientSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    cardNumber: {
      type: Number, // Auto-assigned by the system
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'Other'],
    },
    region: {
      type: String,
      trim: true,
    },
    wereda: {
      type: String,
      trim: true,
    },
    kebele: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    dormitoryNumber: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['IN', 'OUT'],
      default: 'OUT',
    },
    medicalHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalHistory',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Apply Auto-Increment to CardNumber
patientSchema.plugin(AutoIncrement, { inc_field: 'cardNumber', start_seq: 1 });

// Joi Validation Schema
const patientValidationSchema = Joi.object({
  studentId: Joi.string()
    .pattern(/^\d{5}\/\d{2}$/)
    .required()
    .messages({
      'string.pattern.base': 'Student ID must be in the format "number/number" (e.g., 25011/14).',
    }),
  name: Joi.string().trim().required().messages({
    'string.empty': 'Name is required.',
  }),
  age: Joi.number().integer().min(0).required().messages({
    'number.base': 'Age must be a number.',
    'number.min': 'Age cannot be negative.',
  }),
  gender: Joi.string().valid('Male', 'Female', 'Other').required().messages({
    'any.only': 'Gender must be Male, Female, or Other.',
  }),
  region: Joi.string().trim().optional().allow('').messages({
    'string.empty': 'Region is required.',
  }),
  wereda: Joi.string().trim().optional().allow('').messages({
    'string.empty': 'Wereda is required.',
  }),
  kebele: Joi.string().trim().optional().allow('').messages({
    'string.empty': 'Kebele is required.',
  }),
  phoneNumber: Joi.string()
    .pattern(/^0\d{9}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must start with "0" and have 10 digits.',
    }),
  department: Joi.string().trim().optional().allow('').messages({
    'string.empty': 'Department is required.',
  }),
  dormitoryNumber: Joi.string().trim().optional().allow('').messages({
    'string.empty': 'Dormitory number is required.',
  }),
  status: Joi.string().valid('IN', 'OUT').default('OUT').messages({
    'any.only': 'Status must be either IN or OUT.',
  }),
  medicalHistory: Joi.array().items(Joi.string().hex().length(24)).optional(), // MongoDB ObjectId validation
});

// Validate Patient Function
const validatePatient = (patientData) => {
  const { error, value } = patientValidationSchema.validate(patientData, {
    abortEarly: false, // Gather all errors
    allowUnknown: true, // Allow extra fields
    stripUnknown: true, // Remove unknown fields
  });

  if (error) {
    throw new Error(
      error.details.map((err) => err.message).join(', ') // Combine all error messages
    );
  }

  return value; // Sanitized and validated data
};

// Create a model
const Patient = mongoose.model('Patient', patientSchema);

export { Patient, validatePatient };

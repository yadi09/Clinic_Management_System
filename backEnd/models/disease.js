import mongoose from 'mongoose';

// Define the Disease schema
const diseaseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: false, // Optional field
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Disease model
const Disease = mongoose.model('Disease', diseaseSchema);

export default Disease;

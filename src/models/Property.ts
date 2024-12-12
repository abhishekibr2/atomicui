// Import Mongoose

import mongoose, { Schema } from "mongoose";


// Define the Property Schema
const PropertySchema = new Schema({
  propertyId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  owner: {
    name: {
      type: String,
      required: true
    },
    contact: {
      email: {
        type: String,
        required: true
      },
      phone: {
        type: String
      }
    }
  },
  type: {
    type: String,
    enum: ['residential', 'commercial', 'industrial'],
    required: true
  },
  size: {
    type: Number, // Size in square feet
    required: true
  },
  price: {
    type: Number, // Price in currency unit
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'occupied', 'under maintenance'],
    default: 'available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Invoice Model
const PropertyModel = mongoose.models.Property || mongoose.model('Property', PropertySchema);

// Export the Model
export default PropertyModel;

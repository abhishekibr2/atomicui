import mongoose from 'mongoose';
const { Schema } = mongoose;


const clientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
}, {
  timestamps: true // This will automatically add createdAt and updatedAt fields
});

const ClientModel = mongoose.models.Client || mongoose.model('Client', clientSchema);

export default ClientModel; 
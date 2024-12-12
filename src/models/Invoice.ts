import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define the Invoice Schema
const InvoiceSchema = new Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true
  },
  dateIssued: {
    type: Date,
    required: true,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  client: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  items: [
    {
      description: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['unpaid', 'paid', 'overdue'],
    default: 'unpaid'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add a pre-save middleware to calculate totals and update timestamps
InvoiceSchema.pre('save', function (next) {
  // Calculate the total
  this.total = this.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);

  next();
});

// Create the Invoice Model
const InvoiceModel = mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);

// Export the Model
export default InvoiceModel;

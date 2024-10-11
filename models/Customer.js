
import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  memberNumber: { type: Number, required: true, unique: true },
  interests: { type: [String], required: true }, // Array to store multiple interests
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, optional: true },
  address: {
    street: { type: String, optional: true },
    city: { type: String, optional: true },
    state: { type: String, optional: true },
    zipCode: { type: String, optional: true }
  }
}, {
  timestamps: true // Automatically add "createdAt" and "updatedAt" timestamps
});

// Compile and export the model
const Customer = mongoose.model('Customer', customerSchema);
export default Customer;


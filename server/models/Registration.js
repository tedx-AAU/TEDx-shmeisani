const mongoose = require('mongoose');


const AttendeeSchema = new mongoose.Schema({
  ticketCode: {
    type: String,
    required: true,
    unique: true, 
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isCheckedIn: {
    type: Boolean,
    default: false,
  },
  checkedInAt: {
    type: Date,
  }
});


const registrationSchema = new mongoose.Schema(
  {
  
    fullName: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, lowercase: true }, 
    address: { type: String, required: true },
    isStudent: { type: String, required: true },
    university: { type: String, default: '-' },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    heard: { type: String, required: true },
    about: { type: String, required: false },
    customerNumber: { type: Number },

  
    ticketType: { 
      type: String, 
      required: true, 
      enum: ['main', 'full'], 
      default: 'main'
    },
    numberOfTickets: { type: Number, default: 1, min: 1 },
    
    attendees: [AttendeeSchema],

    totalAmount: { type: Number, required: true },
    status: { 
      type: String, 
      default: 'Pending',
      enum: ['Pending', 'Completed', 'Failed', 'Refunded', 'Accepted', 'Rejected'] 
    },
    paymentReference: { 
      type: String, 
      unique: true, 
      sparse: true 
    }
  },
  { timestamps: true }
);


registrationSchema.index({ "attendees.ticketCode": 1 });

module.exports = mongoose.model('Registration', registrationSchema);

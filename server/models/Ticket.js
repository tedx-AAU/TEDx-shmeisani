const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
   
    ticketType: {
      type: String,
      required: [true, 'Ticket type is required'],
      enum: ['main', 'full'], 
      unique: true, 
    },
  
    price: {
      type: Number,
      required: [true, 'Ticket price is required'],
      min: [0, 'Price cannot be negative'],
    },
   
    maxCapacity: {
      type: Number,
      required: [true, 'Max capacity is required'],
      min: [0, 'Capacity cannot be negative'],
    },
    
    soldCount: {
      type: Number,
      default: 0,
      min: [0, 'Sold count cannot be negative'],
    },
  },
  {
    timestamps: true,
  }
);

ticketSchema.virtual('remainingTickets').get(function () {
  return this.maxCapacity - this.soldCount;
});


ticketSchema.set('toJSON', { virtuals: true });
ticketSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Ticket', ticketSchema);

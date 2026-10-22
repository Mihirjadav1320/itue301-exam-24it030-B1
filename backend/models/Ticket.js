const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  attendeeId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Attendee', required: true },
  eventId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  quantity:    { type: Number, required: true, min: [1, 'Quantity must be at least 1'] },
  bookingDate: { type: Date, default: Date.now },
  status:      { type: String, enum: ['booked', 'cancelled', 'used'], default: 'booked' }
});

module.exports = mongoose.model('Ticket', ticketSchema);

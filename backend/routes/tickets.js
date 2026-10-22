const express = require('express');
const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const authGuard = require('../middleware/authGuard');

const router = express.Router();
router.use(authGuard);

// Book tickets
router.post('/', async (req, res, next) => {
  try {
    const { eventId, quantity } = req.body;
    const qty = Number(quantity);

    if (!eventId || !qty || qty < 1) {
      return res.status(400).json({ success: false, message: 'eventId and a quantity of at least 1 are required' });
    }
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    if (event.ticketsAvailable < qty) {
      return res.status(400).json({
        success: false,
        message: `Only ${event.ticketsAvailable} tickets available, requested ${qty}`
      });
    }

    const ticket = await Ticket.create({ attendeeId: req.user.id, eventId, quantity: qty });
    await Event.findByIdAndUpdate(eventId, { $inc: { ticketsAvailable: -qty } });

    res.status(201).json({ success: true, message: 'Tickets booked', ticket });
  } catch (err) { next(err); }
});

// My tickets
router.get('/my', async (req, res, next) => {
  try {
    const tickets = await Ticket.find({ attendeeId: req.user.id })
      .populate('attendeeId', 'name email')
      .populate('eventId', 'title date venue');
    res.status(200).json({ success: true, tickets });
  } catch (err) { next(err); }
});

// Update status
router.patch('/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['booked', 'cancelled', 'used'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Status must be booked, cancelled or used' });
    }
    const ticket = await Ticket.findOne({ _id: req.params.id, attendeeId: req.user.id });
    if (!ticket) return res.status(404).json({ success: false, message: 'Ticket not found' });

    ticket.status = status;
    await ticket.save();
    res.status(200).json({ success: true, ticket });
  } catch (err) { next(err); }
});

module.exports = router;
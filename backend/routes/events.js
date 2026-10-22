const express = require('express');
const Event = require('../models/Event');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json({ success: true, events });
  } catch (err) { next(err); }
});

module.exports = router;
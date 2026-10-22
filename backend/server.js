require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/', (req, res) => res.send('EventHub API running'));

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/events', require('./routes/events'));
app.use('/api/v1/tickets', require('./routes/tickets'));

app.use(errorHandler); // must be last

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err.message));
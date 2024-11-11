const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');  // POST route for payments
const paymentRoutesa = require('./routes/paymentRoutesa');  // GET route for allPayments
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Register routes
app.use('/payment', paymentRoutes);  // POST request for making payments (handled by paymentRoutes)
app.use('/allPayments', paymentRoutesa); // GET request for fetching all payments
app.use('/api/users', userRoutes);   // User routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

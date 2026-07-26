const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');

const speakersRoutes = require('./routes/speakers');
const contactsRoutes = require('./routes/contacts');
const adminRoutes = require('./routes/admin');
const Registration = require('./models/Registration'); 
const checkinAuth =require("./routes/checkin");
const app = express();app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/checkin-auth",checkinAuth);
const PORT = process.env.PORT || 3000;

app.use('/api/contacts', contactsRoutes);
app.use('/api/speakers', speakersRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/registration', require('./routes/registration'));
app.use('/api/checkin', require('./routes/checkin'));

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  });
}

start().catch((err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});

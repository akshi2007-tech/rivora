require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const carePassportRoutes = require('./routes/carePassportRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const auditLogRoutes = require('./routes/auditLogRoutes');
const reportRoutes = require('./routes/reportRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const healthWorkerRoutes = require('./routes/healthWorkerRoutes');
const financialSupportRoutes = require('./routes/financialSupportRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const matchingRoutes = require('./routes/matchingRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/rivora';

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ success: true, data: { status: 'ok', service: 'RIVORA Care Navigation Platform API' } });
});

app.use('/auth', authRoutes);
app.use('/patients', patientRoutes);
app.use('/reports', reportRoutes);
app.use('/care-passport', carePassportRoutes);
app.use('/hospitals', hospitalRoutes);
app.use('/matching', matchingRoutes);
app.use('/financial-support', financialSupportRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/doctor', doctorRoutes);
app.use('/health-worker', healthWorkerRoutes);
app.use('/audit-log', auditLogRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/care-passport', carePassportRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/matching', matchingRoutes);
app.use('/api/financial-support', financialSupportRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/health-worker', healthWorkerRoutes);
app.use('/api/audit-log', auditLogRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal Server Error' });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(PORT, () => {
      console.log(`RIVORA Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

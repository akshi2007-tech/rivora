require('dotenv').config();
const mongoose = require('mongoose');
const Hospital = require('./models/Hospital');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/rivora';

const sampleHospitals = [
  {
    name: 'Apex Women\'s Oncology Center',
    location: 'Manhattan, NY',
    treatmentsAvailable: ['Chemotherapy', 'Radiation', 'Hormone Therapy', 'Targeted Therapy', 'Surgery'],
    specialistAvailable: true,
    distanceFromPatient: 2.5
  },
  {
    name: 'St. Jude Cancer Navigation Center',
    location: 'New York, NY',
    treatmentsAvailable: ['Chemotherapy', 'Radiation', 'Immunotherapy', 'Surgery'],
    specialistAvailable: true,
    distanceFromPatient: 4.2
  },
  {
    name: 'Metropolitan Oncology Hospital',
    location: 'Brooklyn, NY',
    treatmentsAvailable: ['Chemotherapy', 'Hormone Therapy', 'Surgery'],
    specialistAvailable: true,
    distanceFromPatient: 8.7
  },
  {
    name: 'Hope Breast Care Institute',
    location: 'Queens, NY',
    treatmentsAvailable: ['Radiation', 'Targeted Therapy', 'Immunotherapy'],
    specialistAvailable: false,
    distanceFromPatient: 12.1
  },
  {
    name: 'Sunrise Community Health',
    location: 'Bronx, NY',
    treatmentsAvailable: ['Chemotherapy', 'Palliative Care'],
    specialistAvailable: false,
    distanceFromPatient: 15.5
  }
];

const seedHospitals = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding');

    await Hospital.deleteMany({});
    console.log('Cleared existing hospital data');

    const inserted = await Hospital.insertMany(sampleHospitals);
    console.log(`Successfully seeded ${inserted.length} hospitals`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Error seeding hospitals:', err.message);
    process.exit(1);
  }
};

seedHospitals();

const Hospital = require('../models/Hospital');
const CarePassport = require('../models/CarePassport');
const Patient = require('../models/Patient');


const calculateFeasibilityScore = (
  hospital,
  patient,
  carePassport
) => {
  let score = 0;

  // Treatment availability: 30 points
  const requiredCare = carePassport.requiredCare || [];

  const hospitalTreatments =
    hospital.treatmentsAvailable || [];

  const matchedTreatments =
    requiredCare.filter((required) =>
      hospitalTreatments.some(
        (available) =>
          available.toLowerCase() ===
          required.toLowerCase()
      )
    );

  if (requiredCare.length > 0) {
    score +=
      (matchedTreatments.length / requiredCare.length) * 30;
  } else {
    score += 30;
  }

  // Specialist availability: 15 points
  if (hospital.specialistAvailable) {
    score += 15;
  }

  // Hospital capacity: 15 points
  if (hospital.capacityAvailable) {
    score += 15;
  }

  // Waiting time: 15 points
  const waitingTime = hospital.waitingTimeDays || 0;

  if (waitingTime <= 3) {
    score += 15;
  } else if (waitingTime <= 7) {
    score += 10;
  } else if (waitingTime <= 14) {
    score += 5;
  }

  // Distance: 15 points
  const distance =
    hospital.distanceFromPatient || 0;

  const maxDistance =
    carePassport.locationConstraint?.maxDistanceKm ||
    patient.travelToleranceKm ||
    100;

  if (distance <= maxDistance) {
    const distanceScore =
      15 * (1 - distance / maxDistance);

    score += Math.max(0, distanceScore);
  }

  // Financial feasibility: 10 points
  const estimatedCost =
    hospital.estimatedTreatmentCost ||
    patient.totalEstimatedCost ||
    0;

  const fundingGap =
    carePassport.financialConstraint?.fundingGap ||
    patient.financialGap ||
    0;

  if (estimatedCost === 0 || fundingGap <= 0) {
    score += 10;
  } else if (estimatedCost <= fundingGap) {
    score += 7;
  } else {
    score += 3;
  }

  return Math.round(Math.min(score, 100));
};


const generateRecommendationReason = (
  hospital,
  patient,
  score
) => {
  const reasons = [];

  if (hospital.specialistAvailable) {
    reasons.push('specialist available');
  }

  if (hospital.radiotherapyAvailable) {
    reasons.push('radiotherapy available');
  }

  if (hospital.oncologyAvailable) {
    reasons.push('oncology services available');
  }

  if (hospital.surgeryAvailable) {
    reasons.push('surgery available');
  }

  if (hospital.waitingTimeDays <= 7) {
    reasons.push('short waiting time');
  }

  if (
    patient.travelToleranceKm &&
    hospital.distanceFromPatient <=
      patient.travelToleranceKm
  ) {
    reasons.push('within travel tolerance');
  }

  if (reasons.length === 0) {
    return 'Potential match based on available treatment services.';
  }

  return `Recommended because of ${reasons.join(', ')}.`;
};


const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find()
      .sort({ distanceFromPatient: 1 });

    return res.json(hospitals);
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};


const getMatchingHospitals = async (req, res) => {
  try {
    const { patientId } = req.query;

    if (!patientId) {
      return res.status(400).json({
        error: 'patientId query parameter is required'
      });
    }

    const patient =
      await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        error: 'Patient not found'
      });
    }

    const carePassport =
      await CarePassport.findOne({ patientId });

    if (!carePassport) {
      return res.status(404).json({
        error: 'Care Passport not found'
      });
    }

    const hospitals = await Hospital.find();

    const results = hospitals
      .map((hospital) => {
        const score =
          calculateFeasibilityScore(
            hospital,
            patient,
            carePassport
          );

        return {
          ...hospital.toObject(),

          feasibilityScore: score,

          whyRecommended:
            generateRecommendationReason(
              hospital,
              patient,
              score
            )
        };
      })
      .filter(
        (hospital) =>
          hospital.feasibilityScore >= 30
      )
      .sort(
        (a, b) =>
          b.feasibilityScore -
          a.feasibilityScore
      );

    return res.json(results);
  } catch (err) {
    console.error(
      'Hospital matching error:',
      err
    );

    return res.status(500).json({
      error: err.message
    });
  }
};


module.exports = {
  getAllHospitals,
  getMatchingHospitals
};
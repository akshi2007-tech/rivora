const Hospital = require('./models/Hospital');


const calculateHospitalScore = (
  hospital,
  patient,
  carePassport
) => {
  let score = 0;

  const requiredCare =
    carePassport.requiredCare || [];

  const treatments =
    hospital.treatmentsAvailable || [];

  // Treatment match: 40 points
  if (requiredCare.length > 0) {
    const matches =
      requiredCare.filter((required) =>
        treatments.some(
          (available) =>
            available.toLowerCase() ===
            required.toLowerCase()
        )
      );

    score +=
      (matches.length / requiredCare.length) * 40;
  } else {
    score += 40;
  }

  // Specialist: 15 points
  if (hospital.specialistAvailable) {
    score += 15;
  }

  // Capacity: 15 points
  if (hospital.capacityAvailable) {
    score += 15;
  }

  // Waiting time: 15 points
  if (hospital.waitingTimeDays <= 3) {
    score += 15;
  } else if (hospital.waitingTimeDays <= 7) {
    score += 10;
  } else if (hospital.waitingTimeDays <= 14) {
    score += 5;
  }

  // Distance: 15 points
  const distance =
    hospital.distanceFromPatient || 0;

  const maxDistance =
    carePassport.locationConstraint
      ?.maxDistanceKm ||
    patient.travelToleranceKm ||
    100;

  if (distance <= maxDistance) {
    score +=
      15 *
      (1 - distance / maxDistance);
  }

  return Math.round(
    Math.min(score, 100)
  );
};


const matchHospitals = async (
  patient,
  carePassport
) => {
  const hospitals =
    await Hospital.find();

  return hospitals
    .map((hospital) => ({
      hospital,
      score: calculateHospitalScore(
        hospital,
        patient,
        carePassport
      )
    }))
    .sort((a, b) => b.score - a.score);
};


const matchFundingOrTrials = async (
  patientId,
  carePassport
) => {
  // Funding and clinical trial collections
  // can be connected here later.

  return {
    fundingMatches: [],
    clinicalTrialMatches: []
  };
};


module.exports = {
  calculateHospitalScore,
  matchHospitals,
  matchFundingOrTrials
};
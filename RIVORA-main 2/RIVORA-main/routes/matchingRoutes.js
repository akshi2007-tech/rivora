const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const Patient = require('../models/Patient');
const CarePassport = require('../models/CarePassport');
const Hospital = require('../models/Hospital');

const calculateScore = (hospital, patient, carePassport) => {
  let score = 0;
  const requiredCare = carePassport.requiredCare || [];
  const treatments = hospital.treatmentsAvailable || [];

  if (requiredCare.length > 0) {
    const matches = requiredCare.filter((required) => treatments.some((available) => available.toLowerCase() === required.toLowerCase()));
    score += (matches.length / requiredCare.length) * 40;
  } else {
    score += 40;
  }

  if (hospital.specialistAvailable) score += 15;
  if (hospital.capacityAvailable) score += 15;
  if (hospital.radiotherapyAvailable) score += 10;
  if (hospital.oncologyAvailable) score += 10;
  if (hospital.surgeryAvailable) score += 10;

  const waitingTime = hospital.waitingTimeDays || 0;
  if (waitingTime <= 3) score += 15;
  else if (waitingTime <= 7) score += 10;
  else if (waitingTime <= 14) score += 5;

  const distance = hospital.distanceFromPatient || 0;
  const maxDistance = carePassport.locationConstraint?.maxDistanceKm || patient.travelToleranceKm || 100;
  if (distance <= maxDistance) {
    score += 15 * (1 - distance / maxDistance);
  }

  const fundingGap = patient.financialGap || carePassport.financialConstraint?.fundingGap || 0;
  const estimatedCost = hospital.estimatedTreatmentCost || patient.totalEstimatedCost || 0;
  if (estimatedCost === 0 || fundingGap <= 0) score += 10;
  else if (estimatedCost <= fundingGap) score += 7;
  else score += 3;

  return Math.min(Math.round(score), 100);
};

const buildReason = (hospital, patient) => {
  const reasons = [];
  if (hospital.specialistAvailable) reasons.push('specialist available');
  if (hospital.radiotherapyAvailable) reasons.push('radiotherapy available');
  if (hospital.oncologyAvailable) reasons.push('oncology services available');
  if (hospital.surgeryAvailable) reasons.push('surgery available');
  if ((hospital.waitingTimeDays || 0) <= 7) reasons.push('short waiting time');
  if ((hospital.distanceFromPatient || 0) <= (patient.travelToleranceKm || 100)) reasons.push('within travel tolerance');
  return reasons.length ? `Recommended because of ${reasons.join(', ')}.` : 'Potential match based on available treatment services.';
};

router.post('/hospitals', authenticateToken, authorizeRoles('patient', 'doctor', 'healthworker'), async (req, res) => {
  try {
    const { patientId } = req.body;
    if (!patientId) {
      return res.status(400).json({ success: false, message: 'patientId is required' });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    if (req.user.role === 'patient' && patient.userId && patient.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied: you can only view your own hospital matches' });
    }

    const carePassport = await CarePassport.findOne({ patientId }) || {
      requiredCare: [],
      locationConstraint: { maxDistanceKm: patient.travelToleranceKm || 100 },
      financialConstraint: { fundingGap: patient.financialGap || 0 }
    };

    const hospitals = await Hospital.find();
    const recommendations = hospitals
      .map((hospital) => {
        const feasibilityScore = calculateScore(hospital, patient, carePassport);
        return {
          id: hospital._id,
          name: hospital.name,
          location: hospital.location,
          distanceKm: hospital.distanceFromPatient || 0,
          travelTime: `${Math.max(1, Math.round((hospital.distanceFromPatient || 0) / 25))} hrs`,
          surgeryAvailable: !!hospital.surgeryAvailable,
          oncologyAvailable: !!hospital.oncologyAvailable,
          radiotherapyAvailable: !!hospital.radiotherapyAvailable,
          waitingTimeDays: hospital.waitingTimeDays || 0,
          feasibilityScore,
          whyRecommended: buildReason(hospital, patient),
          isRecommended: feasibilityScore >= 60,
          contactNumber: hospital.contactNumber,
          supportedSchemes: hospital.supportedSchemes || []
        };
      })
      .filter((item) => item.feasibilityScore >= 30)
      .sort((a, b) => b.feasibilityScore - a.feasibilityScore);

    return res.json({ success: true, data: recommendations });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

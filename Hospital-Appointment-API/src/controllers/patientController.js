const asyncHandler = require("express-async-handler");
const Patient = require("../models/Patient");

// @desc    Get all patients
// @route   GET /api/patients
// @access  Public
const getPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find();
  res.status(200).json(patients);
});

// @desc    Get single patient
// @route   GET /api/patients/:id
// @access  Public
const getPatientById = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  res.status(200).json(patient);
});

// @desc    Create patient
// @route   POST /api/patients
// @access  Public
const createPatient = asyncHandler(async (req, res) => {
  const { name, email, phone, age, gender, address } = req.body;

  if (!name || !email || !phone || !age || !gender || !address) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const patient = await Patient.create({
    name,
    email,
    phone,
    age,
    gender,
    address,
  });

  res.status(201).json(patient);
});

// @desc    Update patient
// @route   PUT /api/patients/:id
// @access  Public
const updatePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  const updatedPatient = await Patient.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json(updatedPatient);
});

// @desc    Delete patient
// @route   DELETE /api/patients/:id
// @access  Public
const deletePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  await patient.deleteOne();

  res.status(200).json({
    message: "Patient deleted successfully",
  });
});

module.exports = {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
};

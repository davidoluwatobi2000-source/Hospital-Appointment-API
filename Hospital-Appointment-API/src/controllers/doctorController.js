const asyncHandler = require("express-async-handler");
const Doctor = require("../models/Doctor");

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find();
  res.status(200).json(doctors);
});

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    res.status(404);
    throw new Error("Doctor not found");
  }

  res.status(200).json(doctor);
});

// @desc    Create doctor
// @route   POST /api/doctors
// @access  Public
const createDoctor = asyncHandler(async (req, res) => {
  const { name, specialization, email, phone, availability } = req.body;

  if (!name || !specialization || !email || !phone) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const doctor = await Doctor.create({
    name,
    specialization,
    email,
    phone,
    availability,
  });

  res.status(201).json(doctor);
});

// @desc    Update doctor
// @route   PUT /api/doctors/:id
// @access  Public
const updateDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    res.status(404);
    throw new Error("Doctor not found");
  }

  const updatedDoctor = await Doctor.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json(updatedDoctor);
});

// @desc    Delete doctor
// @route   DELETE /api/doctors/:id
// @access  Public
const deleteDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    res.status(404);
    throw new Error("Doctor not found");
  }

  await doctor.deleteOne();

  res.status(200).json({
    message: "Doctor deleted successfully",
  });
});

module.exports = {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};

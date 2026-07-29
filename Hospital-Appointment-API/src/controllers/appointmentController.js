const asyncHandler = require("express-async-handler");
const Appointment = require("../models/appointment");
const { bookAppointment } = require("../services/bookingService");

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = asyncHandler(async (req, res) => {
  const appointment = await bookAppointment(req.body);

  res.status(201).json({
    success: true,
    message: "Appointment booked successfully.",
    data: appointment,
  });
});

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private/Admin
const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find()
    .populate("doctor")
    .populate("patient");

  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments,
  });
});

// @desc    Get a single appointment
// @route   GET /api/appointments/:id
// @access  Private

const getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate("doctor")
    .populate("patient");

  if (!appointment) {
    res.status(404);
    throw new Error("Appointment not found.");
  }

  res.status(200).json({
    success: true,
    data: appointment,
  });
});
// @desc    Cancel appointment
// @route   PATCH /api/appointments/:id/cancel
// @access  Private

const cancelAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    res.status(404);
    throw new Error("Appointment not found.");
  }

  appointment.status = "cancelled";

  await appointment.save();

  res.status(200).json({
    success: true,
    message: "Appointment cancelled successfully.",
    data: appointment,
  });
});

// @desc    Search appointments
// @route   GET /api/appointments/search
// @access  Private

const searchAppointments = asyncHandler(async (req, res) => {
  const { status, date } = req.query;

  const filter = {};

  if (status) {
    filter.status = status;
  }

  if (date) {
    filter.appointmentDate = new Date(date);
  }

  const appointments = await Appointment.find(filter)
    .populate("doctor")
    .populate("patient");

  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments,
  });
});

module.exports = {createAppointment, getAppointments, getAppointmentById, cancelAppointment,searchAppointments,};
const express = require("express");

const router = express.Router();

const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  cancelAppointment,
  searchAppointments,
} = require("../controllers/appointmentController");

const { protect } = require("../middleware/authMiddleware");

// Search appointments
router.get("/search", protect, searchAppointments);

// Get all appointments
router.get("/", protect, getAppointments);

// Get one appointment
router.get("/:id", protect, getAppointmentById);

// Book appointment
router.post("/", protect, createAppointment);

// Cancel appointment
router.patch("/:id/cancel", protect, cancelAppointment);

module.exports = router;
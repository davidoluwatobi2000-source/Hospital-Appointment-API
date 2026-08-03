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
router.get("/search", searchAppointments);

// Get all appointments
router.get("/", getAppointments);

// Get one appointment
router.get("/:id", getAppointmentById);

// Book appointment
router.post("/", createAppointment);

// Cancel appointment
router.patch("/:id/cancel", cancelAppointment);

module.exports = router;
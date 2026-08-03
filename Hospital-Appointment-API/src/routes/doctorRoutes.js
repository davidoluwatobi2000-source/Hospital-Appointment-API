const express = require("express");
const router = express.Router();

const {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

// GET all doctors & POST new doctor
router.route("/").get(getDoctors).post(createDoctor);

// GET, UPDATE & DELETE doctor by ID
router.route("/:id").get(getDoctorById).put(updateDoctor).delete(deleteDoctor);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");

// GET all patients & POST new patient
router.route("/").get(getPatients).post(createPatient);

// GET, UPDATE & DELETE patient by ID
router
  .route("/:id")
  .get(getPatientById)
  .put(updatePatient)
  .delete(deletePatient);

module.exports = router;

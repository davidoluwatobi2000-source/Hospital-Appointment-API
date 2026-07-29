const Appointment = require("../models/appointment");
const {
  checkDoctorAvailability,
} = require("./availabilityService");

const bookAppointment = async (appointmentData) => {
  const {
    patient,
    doctor,
    appointmentDate,
    appointmentTime,
    reason,
  } = appointmentData;

  // Check if the doctor is available
  const isAvailable = await checkDoctorAvailability(
    doctor,
    appointmentDate,
    appointmentTime
  );

  if (!isAvailable) {
    throw new Error(
      "Doctor is not available at the selected date and time."
    );
  }

  // Create the appointment
  const appointment = await Appointment.create({
    patient,
    doctor,
    appointmentDate,
    appointmentTime,
    reason,
  });

  return appointment;
};

module.exports = {
  bookAppointment,
};
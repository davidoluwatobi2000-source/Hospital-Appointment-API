const Appointment = require("../models/appointment");

const checkDoctorAvailability = async (
  doctorId,
  appointmentDate,
  appointmentTime
) => {
  const existingAppointment = await Appointment.findOne({
    doctor: doctorId,
    appointmentDate: appointmentDate,
    appointmentTime: appointmentTime,
    status: {
      $ne: "cancelled",
    },
  });

  return !existingAppointment;
};

module.exports = {
  checkDoctorAvailability,
};
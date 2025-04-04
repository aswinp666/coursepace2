const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  age: { type: Number, required: true },
  course: { type: String, required: true },
});

const Enrollment = mongoose.model("Enrollment", EnrollmentSchema);
module.exports = Enrollment;

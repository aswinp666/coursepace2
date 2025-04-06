// src/components/models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  level: { type: String, required: true },
  instructor: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Courses', courseSchema);

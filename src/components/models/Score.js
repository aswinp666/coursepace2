// models/Score.js

import mongoose from 'mongoose'

const scoreSchema = new mongoose.Schema({
  quizuserName: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  categories: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Score || mongoose.model('Score', scoreSchema)

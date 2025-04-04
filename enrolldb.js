

const express = require('express');
const router = express.Router();
const Enrollment = require('./src/components/models/Enrollment');

// POST endpoint
router.post('/enroll', async (req, res) => {
  const { name, dob, age, course } = req.body;

  // Validation
  if (!name || !dob || !age || !course) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    //  new enrollment entry in MongoDB
    const newEnrollment = new Enrollment({ name, dob, age, course });

    // Save to MongoDB
    await newEnrollment.save();

    // Response
    res.status(200).json({ message: 'Enrollment successful' });
  } catch (error) {
    console.error('Error enrolling user:', error);
    res.status(500).json({ error: 'Failed to enroll, please try again' });
  }
});

module.exports = router;

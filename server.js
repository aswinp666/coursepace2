require('dotenv').config()
const express = require('express')
const connectDB = require('./db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const User = require('./src/components/models/User')
const Enrollment = require('./src/components/models/Enrollment')
const Course = require('./src/components/models/Coursecrud')
const Score = require('./src/components/models/Score')

const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://coursespace-production.up.railway.app'],
    credentials: true,
  })
)
app.use(cookieParser())
app.use(express.json())

// Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ error: 'Unauthorized: No Token' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    console.error('Token error:', error)
    return res.status(401).json({ error: 'Invalid or Expired Token' })
  }
}

// Routes

// Signup
app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ error: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ email, password: hashedPassword })
    await newUser.save()

    res.json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Signin
app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true in prod
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    res.json({ message: 'Login successful', user: { email: user.email } })
  } catch (error) {
    console.error('Signin error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Logout
app.post('/logout', (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Logged out successfully' })
})

// Get Logged In User
app.get('/user', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password')
  res.json({ user })
})

// Enroll
app.post('/enroll', authMiddleware, async (req, res) => {
  const { name, dob, age, course } = req.body
  if (!name || !dob || !age || !course) {
    return res.status(400).json({ error: 'All fields required' })
  }

  try {
    const newEnrollment = new Enrollment({ name, dob, age, course, userId: req.user.id })
    await newEnrollment.save()
    res.json({ message: 'Enrollment successful' })
  } catch (error) {
    console.error('Enrollment error:', error)
    res.status(500).json({ error: 'Failed to enroll' })
  }
})

// Get All Enrollments
app.get('/enrollments', async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
    res.json(enrollments)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch enrollments' })
  }
})

// CRUD for Courses
app.post('/courses', authMiddleware, async (req, res) => {
  try {
    const course = new Course(req.body)
    await course.save()
    res.status(201).json(course)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course' })
  }
})

app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find()
    res.json(courses)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' })
  }
})

app.put('/courses/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update course' })
  }
})

app.delete('/courses/:id', authMiddleware, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id)
    res.json({ message: 'Course deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete course' })
  }
})

// Score Submission
app.post('/api/scores', async (req, res) => {
  const { quizuserName, score, totalQuestions, percentage, categories } = req.body
  if (!quizuserName || typeof score !== 'number') {
    return res.status(400).json({ error: 'Invalid data' })
  }

  try {
    const newScore = await Score.create({ quizuserName, score, totalQuestions, percentage, categories })
    res.status(201).json({ success: true, data: newScore })
  } catch (error) {
    res.status(500).json({ error: 'Failed to save score' })
  }
})

// Server Start
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

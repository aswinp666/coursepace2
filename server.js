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
const Razorpay = require('razorpay')
const crypto = require('crypto')

const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:8080', 'https://coursespace-production.up.railway.app'],
  })
)
app.use(cookieParser())
app.use(express.json())

// Initialize Razorpay with your test credentials
const razorpay = new Razorpay({
  key_id: 'rzp_test_mUSjI5TdDnWLE9',
  key_secret: 'iXhsC3lJOjbPXwNoSkRUHheV',
})

// API Endpoints

// Create Razorpay Order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, courseId } = req.body

    if (!amount || !courseId) {
      return res.status(400).json({ error: 'Amount and course ID are required' })
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      notes: {
        courseId,
        purpose: 'course_payment',
      },
    }

    const order = await razorpay.orders.create(options)
    res.json({ order })
  } catch (err) {
    console.error('Razorpay order creation failed:', err.message || err.error || err)
    // Razorpay errors often have a structured `error` object
    if (err.error) {
      console.error('Razorpay error details:', err.error)
      return res.status(err.statusCode || 500).json({
        error: 'Failed to create order with Razorpay',
        details: err.error.description || err.error.reason,
      })
    }
    res.status(500).json({ error: 'Failed to create order' })
  }
})

// Verify Payment
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, courseId } = req.body

    // Create signature
    const generatedSignature = crypto
      .createHmac('sha256', 'iXhsC3lJOjbPXwNoSkRUHheV')
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    // Verify signature
    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid payment signature' })
    }

    // Create enrollment record
    const enrollment = new Enrollment({
      courseId,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: 'completed',
    })
    await enrollment.save()

    res.json({
      success: true,
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id,
    })
  } catch (err) {
    console.error('Payment verification error:', err)
    res.status(500).json({ error: 'Payment verification failed' })
  }
})

// Get Razorpay Key (safe to expose)
app.get('/api/get-razorpay-key', (req, res) => {
  res.json({ key: 'rzp_test_mUSjI5TdDnWLE9' })
})

// Auth Routes
app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body

    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    user = new User({ email, password: hashedPassword })
    await user.save()

    res.json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    })

    res.json({ message: 'Login successful', user: { email: user.email } })
  } catch (error) {
    console.error('Signin error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/logout', (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Logged out successfully' })
})

// Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// Protected Routes
app.get('/user', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password')
  res.json({ user })
})

// Course Routes
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

// Quiz Routes
app.post('/api/scores', async (req, res) => {
  const { quizuserName, score, totalQuestions, percentage, categories } = req.body

  if (!quizuserName || typeof score !== 'number') {
    return res.status(400).json({
      success: false,
      error: 'Invalid data: quizuserName and score are required',
    })
  }

  try {
    const newScore = await Score.create({
      quizuserName,
      score,
      totalQuestions,
      percentage,
      categories,
    })

    return res.status(201).json({ success: true, data: newScore })
  } catch (error) {
    console.error('Error saving score:', error)
    return res.status(500).json({ success: false, error: error.message })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

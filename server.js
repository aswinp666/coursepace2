require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const User = require("./src/components/models/User");
const Enrollment = require("./src/components/models/Enrollment"); 

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000", 
  })
);
app.use(cookieParser());

//  Sign Up Route (Register)
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({ email, password: hashedPassword });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  Sign In Route (Login)
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Token expires in 7 days
    });

    // Send token in HTTP-Only Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "Lax",
    });

    res.json({ message: "Login successful", user: { email: user.email } });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  Logout Route (Clear Cookie)
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

//  Middleware to Protect Routes
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

//  Get Logged-in User
app.get("/user", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json({ user });
});







//  Enrollment Route (For Enrolling Users)
app.post("/enroll", authMiddleware, async (req, res) => {
  const { name, dob, age, course } = req.body;

  // Check if all fields are provided
  if (!name || !dob || !age || !course) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // new enrollment entry in MongoDB
    const newEnrollment = new Enrollment({
      name,
      dob,
      age,
      course,
      userId: req.user.id,  
    });

    // Save the enrollment
    await newEnrollment.save();

    res.json({ message: "Enrollment successful" });
  } catch (error) {
    console.error("Enrollment error:", error);
    res.status(500).json({ error: "Failed to enroll, please try again" });
  }
});


// Get All Enrolled Students
app.get("/enrollments", async (req, res) => {
  try {
    const enrollments = await Enrollment.find(); 
    res.json(enrollments);
  } catch (error) {
    console.error("Fetch enrollments error:", error);
    res.status(500).json({ error: "Failed to fetch enrollments" });
  }
});


//  Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

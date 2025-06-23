import React, { useEffect, useState } from 'react'
import axios from 'axios' // Still imported, but not used for initial data fetch

const CoursesPage = () => {
  // --- STATIC COURSE DATA ---
  const staticCoursesData = [
    {
      _id: 'c001',
      title: 'AWS Certified Solutions Architect',
      description: 'Master the design of scalable systems on Amazon Web Services (AWS).',
      category: 'Cloud Computing',
      duration: '40 hours',
      instructor: 'Alice Johnson',
      level: 'Advanced',
    },
    {
      _id: 'c002',
      title: 'Introduction to Machine Learning with Python',
      description: 'Learn the fundamentals of ML using Python and popular libraries like Scikit-learn.',
      category: 'Artificial Intelligence',
      duration: '30 hours',
      instructor: 'Bob Smith',
      level: 'Intermediate',
    },
    {
      _id: 'c003',
      title: 'React - The Complete Guide (incl Hooks, React Router, Redux)',
      description: 'Build powerful, declarative, and maintainable user interfaces with React.',
      category: 'Web Development',
      duration: '50 hours',
      instructor: 'Max Schwarzmüller',
      level: 'All Levels',
    },
    {
      _id: 'c004',
      title: 'DevOps Masterclass: Docker, Kubernetes, Jenkins',
      description: 'Automate your software delivery pipeline with industry-leading DevOps tools.',
      category: 'DevOps',
      duration: '60 hours',
      instructor: 'Chris Miller',
      level: 'Advanced',
    },
    {
      _id: 'c005',
      title: 'Azure Fundamentals (AZ-900) Certification Prep',
      description: 'Get started with Microsoft Azure cloud services and prepare for the AZ-900 exam.',
      category: 'Cloud Computing',
      duration: '25 hours',
      instructor: 'Sarah Davis',
      level: 'Beginner',
    },
    {
      _id: 'c006',
      title: 'Advanced Deep Learning with TensorFlow 2.x',
      description: 'Dive deep into neural networks, CNNs, RNNs, and more using TensorFlow.',
      category: 'Artificial Intelligence',
      duration: '45 hours',
      instructor: 'Dr. Emily White',
      level: 'Advanced',
    },
    {
      _id: 'c007',
      title: 'Node.js, Express, MongoDB & More: The Masterclass',
      description: 'Build robust RESTful APIs with Node.js, Express, and MongoDB.',
      category: 'Web Development',
      duration: '35 hours',
      instructor: 'John Doe',
      level: 'Intermediate',
    },
    {
      _id: 'c008',
      title: 'Google Cloud Platform (GCP) Fundamentals',
      description: 'Understand the core services and architecture of Google Cloud Platform.',
      category: 'Cloud Computing',
      duration: '20 hours',
      instructor: 'Olivia Green',
      level: 'Beginner',
    },
    {
      _id: 'c009',
      title: 'Natural Language Processing (NLP) with Python',
      description: 'Process and understand human language using Python and NLTK.',
      category: 'Artificial Intelligence',
      duration: '28 hours',
      instructor: 'David Lee',
      level: 'Intermediate',
    },
    {
      _id: 'c010',
      title: 'Complete Web Development Bootcamp 2024',
      description: 'Learn HTML, CSS, JavaScript, Node, React, MongoDB and build real-world projects.',
      category: 'Web Development',
      duration: '70 hours',
      instructor: 'Angela Yu',
      level: 'All Levels',
    },
    {
      _id: 'c011',
      title: 'Certified Ethical Hacker (CEH) v12',
      description: 'Master ethical hacking techniques and tools to become a cybersecurity expert.',
      category: 'Cybersecurity',
      duration: '55 hours',
      instructor: 'Sophia Turner',
      level: 'Advanced',
    },
    {
      _id: 'c012',
      title: 'Python for Data Science and Machine Learning',
      description: 'Learn to use Python for data analysis, visualization, and machine learning.',
      category: 'Data Science',
      duration: '40 hours',
      instructor: 'Frank Adams',
      level: 'Intermediate',
    },
    {
      _id: 'c013',
      title: 'iOS App Development with Swift 5 and SwiftUI',
      description: "Build native iOS applications from scratch using Apple's latest technologies.",
      category: 'Mobile Development',
      duration: '48 hours',
      instructor: 'Grace Wilson',
      level: 'Intermediate',
    },
    {
      _id: 'c014',
      title: 'SQL & Database Design for Developers',
      description: 'Learn SQL fundamentals, relational database design, and advanced querying.',
      category: 'Database Management',
      duration: '22 hours',
      instructor: 'Henry Clark',
      level: 'Beginner',
    },
    {
      _id: 'c015',
      title: 'Linux Command Line Basics',
      description: 'Master the Linux command line for system administration and development.',
      category: 'DevOps',
      duration: '15 hours',
      instructor: "Patty O'Connell",
      level: 'Beginner',
    },
  ]
  // -------------------------

  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)
  // --- NEW: Wishlist state ---
  const [wishlist, setWishlist] = useState(() => {
    // Initialize wishlist from localStorage if available
    try {
      const storedWishlist = localStorage.getItem('courseWishlist')
      return storedWishlist ? JSON.parse(storedWishlist) : []
    } catch (e) {
      console.error('Failed to load wishlist from localStorage', e)
      return []
    }
  })
  // -------------------------

  const categories = [
    'All',
    'Cloud Computing',
    'Web Development',
    'Artificial Intelligence',
    'Data Science',
    'DevOps',
    'Cybersecurity',
    'Mobile Development',
    'Database Management',
  ]

  // Load Razorpay script when component mounts
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true

    script.onload = () => {
      setRazorpayLoaded(true)
    }

    script.onerror = () => {
      setError('Failed to load Razorpay SDK')
      setRazorpayLoaded(false)
    }

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Use static data instead of fetching from API
  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      const coursesWithRandomPrices = staticCoursesData.map((course) => {
        const isFree = Math.random() < 0.2 // 20% chance of being free
        return {
          ...course,
          price: isFree ? 0 : Math.floor(Math.random() * (2000 - 500 + 1)) + 500, // Prices between 500 and 2000
        }
      })
      setCourses(coursesWithRandomPrices)
      setLoading(false)
    }, 500) // Simulate network delay
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('courseWishlist', JSON.stringify(wishlist))
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e)
    }
  }, [wishlist])

  // Filter courses when 'courses' or 'selectedCategory' changes
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredCourses(courses)
    } else {
      setFilteredCourses(courses.filter((course) => course.category === selectedCategory))
    }
  }, [courses, selectedCategory])

  const verifyPayment = async (paymentResponse, course) => {
    try {
      const res = await axios.post('http://localhost:5000/verify-payment', {
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_signature: paymentResponse.razorpay_signature,
        courseId: course._id,
        amount: course.price * 100, // Convert to paise
      })

      return res.data.success
    } catch (err) {
      console.error('Verification error:', err)
      return false
    }
  }

  const handlePayment = async (course) => {
    if (course.price === 0) {
      alert('Enrollment for free course successful!')
      return
    }

    try {
      const { data } = await axios.post('http://localhost:5000/api/create-order', {
        amount: course.price * 100,
        courseId: course._id,
      })

      const options = {
        key: 'rzp_test_mUSjI5TdDnWLE9',
        amount: data.amount,
        currency: 'INR',
        order_id: data.id,

        handler: async function (response) {
          await axios.post('/api/payment/verify', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            courseId: course._id,
          })

          alert('Payment Successful & Course Enrolled!')
        },
        theme: {
          color: '#3399cc',
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error(error)
      alert('Payment Failed')
    }
  }

  // --- NEW: Toggle Wishlist Function ---
  const handleToggleWishlist = (courseId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(courseId)) {
        // Remove from wishlist
        return prevWishlist.filter((id) => id !== courseId)
      } else {
        // Add to wishlist
        return [...prevWishlist, courseId]
      }
    })
  }
  // ------------------------------------

  // Styles (unchanged for brevity, but will add wishlist button style)
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: '#fff',
    minHeight: '100vh',
  }

  const titleStyle = {
    fontSize: '2.5rem',
    color: 'rgb(18, 124, 113)',
    textAlign: 'center',
    marginBottom: '0.5rem',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  }

  const subtitleStyle = {
    fontSize: '1.1rem',
    color: 'rgba(0, 0, 0, 0.7)',
    textAlign: 'center',
    marginBottom: '2rem',
  }

  const filterButtonsContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  }

  const filterButtonStyle = (isActive) => ({
    padding: '0.75rem 1.5rem',
    borderRadius: '25px',
    border: `2px solid ${isActive ? 'rgb(18, 124, 113)' : 'rgba(0, 0, 0, 0.1)'}`,
    background: isActive ? 'rgb(18, 124, 113)' : 'transparent',
    color: isActive ? '#fff' : 'rgb(18, 124, 113)',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: isActive ? '0 4px 12px rgba(18, 124, 113, 0.3)' : 'none',
    ':hover': {
      background: isActive ? 'rgb(11, 82, 91)' : 'rgba(18, 124, 113, 0.05)',
      borderColor: isActive ? 'rgb(11, 82, 91)' : 'rgb(18, 124, 113)',
      color: isActive ? '#fff' : 'rgb(11, 82, 91)',
    },
  })

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
  }

  const cardStyle = {
    background: 'linear-gradient(135deg, rgba(18, 124, 113, 0.9) 0%, rgba(11, 82, 91, 0.9) 100%)',
    borderRadius: '15px',
    padding: '1.5rem',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex', // Use flexbox for internal layout
    flexDirection: 'column',
    justifyContent: 'space-between', // Push footer to bottom
  }

  const freeLabelStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: '#FFD700',
    color: '#000',
    padding: '0.25rem 0.75rem',
    borderRadius: '10px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    zIndex: 2,
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  }

  const cardHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    position: 'relative',
    zIndex: '1',
  }

  const cardTitleStyle = {
    fontSize: '1.5rem',
    margin: '0',
    fontWeight: '600',
  }

  const levelStyle = (level) => ({
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
    background: 'rgba(255, 255, 255, 0.3)',
    color: '#fff',
    border: '1px solid rgba(255, 255, 255, 0.5)',
  })

  const descriptionStyle = {
    marginBottom: '1.5rem',
    lineHeight: '1.5',
    color: 'rgba(255, 255, 255, 0.9)',
    position: 'relative',
    zIndex: '1',
    flexGrow: 1, // Allow description to take available space
  }

  const detailsStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '1.5rem',
    position: 'relative',
    zIndex: '1',
  }

  const detailRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  }

  const detailLabelStyle = {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.9rem',
  }

  const detailValueStyle = {
    fontWeight: '500',
    color: '#fff',
  }

  const priceStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '1rem 0',
    textAlign: 'center',
  }

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '8px',
    border: 'none',
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    position: 'relative',
    zIndex: '1',
    marginTop: '0.5rem', // Space between buttons
  }

  // --- NEW: Wishlist Button Style ---
  const wishlistButtonStyle = (isWishlisted) => ({
    width: '100%',
    padding: '0.75rem',
    borderRadius: '8px',
    border: `1px solid ${isWishlisted ? '#FF6347' : 'rgba(255, 255, 255, 0.3)'}`,
    background: isWishlisted ? '#FF6347' : 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(5px)',
    position: 'relative',
    zIndex: '1',
    marginTop: '0.5rem',
    ':hover': {
      background: isWishlisted ? '#E5533A' : 'rgba(255, 255, 255, 0.2)',
      borderColor: isWishlisted ? '#E5533A' : 'rgba(255, 255, 255, 0.4)',
    },
  })
  // ---------------------------------

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Available Courses</h1>
      <p style={subtitleStyle}>Explore our diverse range of courses designed to boost your skills.</p>

      <div style={filterButtonsContainerStyle}>
        {categories.map((category) => (
          <button
            key={category}
            style={filterButtonStyle(selectedCategory === category)}
            onClick={() => setSelectedCategory(category)}
          >
            {category === 'All' ? 'All Courses' : `${category} Courses`}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: 'rgb(18, 124, 113)', textAlign: 'center' }}>Loading courses...</p>
      ) : error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      ) : (
        <div style={gridStyle}>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => {
              const isWishlisted = wishlist.includes(course._id) // Check if current course is in wishlist
              return (
                <div
                  key={course._id}
                  style={cardStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)'
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = ''
                    e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.1)'
                  }}
                >
                  {course.price === 0 && <span style={freeLabelStyle}>Free</span>}
                  <div style={cardHeaderStyle}>
                    <h3 style={cardTitleStyle}>{course.title}</h3>
                    <span style={levelStyle(course.level)}>{course.level}</span>
                  </div>
                  <p style={descriptionStyle}>{course.description}</p>

                  <div style={priceStyle}>{course.price === 0 ? 'Free' : `₹ ${course.price}`}</div>

                  <div style={detailsStyle}>
                    <div style={detailRowStyle}>
                      <span style={detailLabelStyle}>Duration:</span>
                      <span style={detailValueStyle}>{course.duration}</span>
                    </div>
                    <div style={detailRowStyle}>
                      <span style={detailLabelStyle}>Instructor:</span>
                      <span style={detailValueStyle}>{course.instructor}</span>
                    </div>
                    <div style={detailRowStyle}>
                      <span style={detailLabelStyle}>Category:</span>
                      <span style={detailValueStyle}>{course.category}</span>
                    </div>
                  </div>

                  {/* Buttons at the bottom */}
                  <div>
                    <button
                      style={buttonStyle}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.2)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                      onClick={() => handlePayment(course)}
                      disabled={course.price !== 0 && !razorpayLoaded}
                    >
                      {course.price === 0 ? 'Enroll (Free)' : razorpayLoaded ? 'Enroll Now' : 'Loading Payment...'}
                    </button>

                    {/* --- NEW: Wishlist Button Rendered Here --- */}
                    <button
                      style={wishlistButtonStyle(isWishlisted)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = isWishlisted ? '#E5533A' : 'rgba(255, 255, 255, 0.25)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = isWishlisted ? '#FF6347' : 'rgba(255, 255, 255, 0.1)'
                      }}
                      onClick={() => handleToggleWishlist(course._id)}
                    >
                      {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>
                    {/* ------------------------------------------- */}
                  </div>
                </div>
              )
            })
          ) : (
            <p style={{ color: 'rgb(18, 124, 113)', textAlign: 'center', gridColumn: '1 / -1' }}>
              No courses found for the selected category.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default CoursesPage

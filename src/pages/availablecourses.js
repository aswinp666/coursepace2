import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CoursesPage = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)

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

  // Fetch course
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/courses')
        setCourses(res.data)
        setLoading(false)
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch courses')
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

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
    try {
      const { data } = await axios.post('/api/payment/checkout', {
        amount: course.price, // auto send price
        courseId: course._id, // auto send course id
      })

      const options = {
        key: 'rzp_test_mUSjI5TdDnWLE9',
        amount: data.order.amount,
        currency: 'INR',
        order_id: data.order.id,
        handler: async function (response) {
          // payment success → verify payment
          await axios.post('/api/payment/verify', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            courseId: course._id, // enroll user for this course
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

  // Styles
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
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Available Courses</h1>
      <p style={subtitleStyle}>Enhance your skills with our comprehensive React courses</p>

      {loading ? (
        <p style={{ color: 'rgb(18, 124, 113)', textAlign: 'center' }}>Loading courses...</p>
      ) : error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      ) : (
        <div style={gridStyle}>
          {courses.map((course) => (
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
              <div style={cardHeaderStyle}>
                <h3 style={cardTitleStyle}>{course.title}</h3>
                <span style={levelStyle(course.level)}>{course.level}</span>
              </div>
              <p style={descriptionStyle}>{course.description}</p>

              <div style={priceStyle}>₹ 1{course.price}</div>

              <div style={detailsStyle}>
                <div style={detailRowStyle}>
                  <span style={detailLabelStyle}>Duration:</span>
                  <span style={detailValueStyle}>{course.duration}</span>
                </div>
                <div style={detailRowStyle}>
                  <span style={detailLabelStyle}>Instructor:</span>
                  <span style={detailValueStyle}>{course.instructor}</span>
                </div>
              </div>

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
                disabled={!razorpayLoaded}
              >
                {razorpayLoaded ? 'Enroll Now' : 'Loading Payment...'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CoursesPage

// test

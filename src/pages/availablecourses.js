import React, { useEffect, useState } from 'react'

const CoursesPage = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`)
        if (!res.ok) throw new Error('Failed to fetch courses')
        const data = await res.json()
        setCourses(data)
        setLoading(false)
      } catch (err) {
        setError(err.message || 'Something went wrong')
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  // Base styles
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: '#fff', // White background for the container
    minHeight: '100vh',
  }

  const titleStyle = {
    fontSize: '2.5rem',
    color: 'rgb(18, 124, 113)', // Using your specified color for text
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

  // Courses grid
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
  }

  // Course card - Green gradient background
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
    '::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(5px)',
      zIndex: 0,
    },
  }

  const cardHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    position: 'relative',
    zIndex: 1,
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
    background:
      level === 'Beginner'
        ? 'rgba(255, 255, 255, 0.3)'
        : level === 'Intermediate'
        ? 'rgba(255, 255, 255, 0.3)'
        : 'rgba(255, 255, 255, 0.3)',
    color: level === 'Beginner' ? '#fff' : level === 'Intermediate' ? '#fff' : '#fff',
    border:
      level === 'Beginner'
        ? '1px solid rgba(255, 255, 255, 0.5)'
        : level === 'Intermediate'
        ? '1px solid rgba(255, 255, 255, 0.5)'
        : '1px solid rgba(255, 255, 255, 0.5)',
  })

  const descriptionStyle = {
    marginBottom: '1.5rem',
    lineHeight: '1.5',
    color: 'rgba(255, 255, 255, 0.9)',
    position: 'relative',
    zIndex: 1,
  }

  const detailsStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '1.5rem',
    position: 'relative',
    zIndex: 1,
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
    zIndex: 1,
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
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CoursesPage

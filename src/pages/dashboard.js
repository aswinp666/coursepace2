import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const MainDashboard = () => {
  const router = useRouter()

  // Color variables
  const primaryColor = 'rgb(18, 124, 113)'
  const primaryColorLight = 'rgba(18, 124, 113, 0.8)'

  // Navbar style
  const navbarStyle = {
    background: primaryColor,
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  }

  // Main container style
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    minHeight: '100vh',
    background: '#fff',
  }

  // Card container style
  const cardsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '3rem',
  }

  // Card style
  const cardStyle = {
    background: primaryColor,
    borderRadius: '12px',
    padding: '2rem',
    color: '#fff',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
      background: primaryColorLight,
    },
  }

  // Card title style
  const cardTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '1rem',
  }

  // Card icon style
  const iconStyle = {
    fontSize: '3rem',
    marginBottom: '1rem',
  }

  return (
    <div>
      {/* Navbar */}
      <nav style={navbarStyle}>
        <h1 style={{ color: '#fff', margin: 0 }}>Coursepace Admin Dashboard</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => router.push('/signin')}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={containerStyle}>
        <h2 style={{ color: primaryColor, textAlign: 'center' }}>Admin Dashboard</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
          Select an option to manage different aspects of the system
        </p>

        <div style={cardsContainerStyle}>
          {/* Course Management Card */}
          <Link href="/admindash" passHref>
            <div style={cardStyle}>
              <div style={iconStyle}>📚</div>
              <h3 style={cardTitleStyle}>Course Management</h3>
              <p>Create, edit, and manage all courses offered by the college</p>
            </div>
          </Link>

          {/* Enrolled Students Management Card */}
          <Link href="/" passHref>
            <div style={cardStyle}>
              <div style={iconStyle}>👨‍🎓</div>
              <h3 style={cardTitleStyle}>Enrolled Student Details</h3>
              <p>View and manage all student enrollments and details</p>
            </div>
          </Link>

          {/* Quizzes Card */}
          <Link href="/" passHref>
            <div style={cardStyle}>
              <div style={iconStyle}> </div>
              <h3 style={cardTitleStyle}>Quizzes Attended</h3>
              <p>View Quizzes Attended and Scores of Users/Guests</p>
            </div>
          </Link>
        </div>
      </div>

      {/* footer */}
      <footer
        style={{
          background: '#f5f5f5',
          padding: '1rem',
          textAlign: 'center',
          color: '#666',
          marginTop: '2rem',
        }}
      >
        <p>© {new Date().getFullYear()} College Management System</p>
      </footer>
    </div>
  )
}

export default MainDashboard

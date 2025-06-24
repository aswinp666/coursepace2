import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const StudentList = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/enrollments')
        const apiStudents = await response.json()
        if (response.ok) {
          // Combine API students with free enrollments from localStorage
          const freeEnrollments = JSON.parse(localStorage.getItem('freeEnrollments')) || []
          setStudents([...apiStudents, ...freeEnrollments])
        } else {
          setError(apiStudents.error || 'Failed to fetch students')
          // Still attempt to load free enrollments if API fails
          const freeEnrollments = JSON.parse(localStorage.getItem('freeEnrollments')) || []
          setStudents(freeEnrollments)
        }
      } catch (err) {
        setError('')
        // Load only free enrollments if network error occurs
        const freeEnrollments = JSON.parse(localStorage.getItem('freeEnrollments')) || []
        setStudents(freeEnrollments)
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()

    // Listen for custom event when a free enrollment is added
    window.addEventListener('freeEnrollmentAdded', fetchStudents)

    // Cleanup event listener
    return () => {
      window.removeEventListener('freeEnrollmentAdded', fetchStudents)
    }
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg,rgb(222, 233, 198) 0%,rgb(196, 230, 201) 100%)',
        padding: '2rem',
        fontFamily: '"Segoe UI", sans-serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <h1 style={{ textAlign: 'center', color: '#2d3748', fontSize: '2rem' }}>Enrolled Students</h1>

        {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
        {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
        {!loading && students.length === 0 && !error && (
          <p style={{ textAlign: 'center', color: '#555' }}>No students enrolled yet.</p>
        )}

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {students.map((student, index) => (
            <li
              key={index}
              style={{
                background: 'white',
                margin: '10px 0',
                padding: '10px',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                borderLeft: student.enrollmentType === 'Free' ? '5px solid #4CAF50' : '5px solid #3182CE',
              }}
            >
              <strong>Name:</strong> {student.name || 'N/A'} <br />
              <strong>DOB:</strong> {student.dob || 'N/A'} <br />
              <strong>Age:</strong> {student.age || 'N/A'} <br />
              <strong>Course:</strong> {student.course} <br />
              {student.enrollmentType && (
                <small style={{ color: student.enrollmentType === 'Free' ? '#4CAF50' : '#3182CE' }}>
                  ({student.enrollmentType} Enrollment)
                </small>
              )}
            </li>
          ))}
        </ul>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link href="/enroll" passHref>
            <button
              style={{
                padding: '0.5rem 1rem',
                background: 'transparent',
                color: '#2f855a',
                border: '2px solid #2f855a',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontSize: '0.9rem',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#2f855a'
                e.target.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent'
                e.target.style.color = '#2f855a'
              }}
            >
              Back to Enrollment
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StudentList

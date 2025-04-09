import React, { useState } from 'react'
import Link from 'next/link'

const EnrollPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    age: '',
    course: '',
  })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Simulate API call
      const response = await fetch('http://localhost:5000/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`Success! ${formData.name} enrolled in ${formData.course}`)
        // Reset form
        setFormData({
          name: '',
          dob: '',
          age: '',
          course: '',
        })
      } else {
        setMessage(`Error: ${data.error || 'Failed to enroll'}`)
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('Network error. Please try again.')
    }
  }

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
          maxWidth: '500px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <h1
          style={{
            color: '#2d3748',
            fontSize: '2rem',
            textAlign: 'center',
            marginBottom: '0.5rem',
          }}
        >
          Enroll Now
        </h1>

        <p
          style={{
            color: '#4a5568',
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          Start your learning journey today
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Full Name"
            required
          />

          <input type="date" name="dob" value={formData.dob} onChange={handleChange} style={inputStyle} required />

          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Age"
            required
          />

          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            style={{ ...inputStyle, appearance: 'none' }}
            required
          >
            <option value="" disabled>
              Select Course
            </option>
            <option value="Android Development">Android Development</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Data Science">Data Science</option>
            <option value="Web Development">Web Development</option>
          </select>

          <button
            type="submit"
            style={{
              padding: '0.75rem',
              background: 'linear-gradient(90deg, #38a169 0%, #2f855a 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontSize: '1rem',
              marginTop: '0.5rem',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
            }}
          >
            Enroll Now
          </button>

          {/* <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <Link href="/studentlist" passHref>
            <button style={{
              padding: '0.5rem 1rem',
              background: 'transparent',
              color: '#2f855a',
              border: '2px solid #2f855a',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontSize: '0.9rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#2f855a';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#2f855a';
            }}>
              Enrolled Students List
            </button>
          </Link>
        </div> */}
        </form>

        {message && (
          <p
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem',
              background: message.includes('Error') ? '#fee2e2' : '#f0fff4',
              borderRadius: '8px',
              color: message.includes('Error') ? '#b91c1c' : '#2f855a',
              textAlign: 'center',
              border: `1px solid ${message.includes('Error') ? '#fecaca' : '#c6f6d5'}`,
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: '8px',
  border: '1px solid #c6f6d5',
  background: 'rgba(255, 255, 255, 0.9)',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border 0.3s',
}

export default EnrollPage

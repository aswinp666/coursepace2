import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const AdminDashboard = () => {
  const [courses, setCourses] = useState([])
  const [form, setForm] = useState({ title: '', description: '', duration: '', level: '', instructor: '' })
  const [editingId, setEditingId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  // Check authentication
  useEffect(() => {
    fetch('http://localhost:5000/user', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized')
        return res.json()
      })
      .catch(() => {
        router.push('/signin')
      })
  }, [])

  // Load courses
  const fetchCourses = async () => {
    const res = await fetch('http://localhost:5000/courses')
    const data = await res.json()
    setCourses(data)
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = editingId ? `http://localhost:5000/courses/${editingId}` : 'http://localhost:5000/courses'
    const method = editingId ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    })

    if (res.ok) {
      await fetchCourses()
      setForm({ title: '', description: '', duration: '', level: '', instructor: '' })
      setEditingId(null)
    }
  }

  const handleEdit = (course) => {
    setForm(course)
    setEditingId(course._id)
  }

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/courses/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    fetchCourses()
  }

  const handleCancel = () => {
    setForm({ title: '', description: '', duration: '', level: '', instructor: '' })
    setEditingId(null)
  }

  // Filter courses based on search term
  const filteredCourses = courses.filter((course) => {
    return (
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.level.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  // Color variables
  const primaryColor = 'rgb(18, 124, 113)'
  const primaryColorLight = 'rgba(18, 124, 113, 0.8)'
  const primaryColorLighter = 'rgba(18, 124, 113, 0.6)'

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: 'auto',
        padding: '2rem',
        minHeight: '100vh',
        background: '#fff',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          color: primaryColor,
          marginBottom: '2rem',
          fontSize: '2.5rem',
          fontWeight: '600',
        }}
      >
        Course Management
      </h1>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: primaryColor,
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '3rem',
          display: 'grid',
          gap: '1.5rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.3)',
            background: 'rgba(255,255,255,0.9)',
            color: '#333',
            fontSize: '1rem',
            outline: 'none',
            transition: 'all 0.3s ease',
          }}
        />
        <textarea
          name="description"
          placeholder="Course Description"
          value={form.description}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.3)',
            background: 'rgba(255,255,255,0.9)',
            color: '#333',
            fontSize: '1rem',
            outline: 'none',
            transition: 'all 0.3s ease',
            minHeight: '100px',
          }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g., 4 weeks)"
            value={form.duration}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.9)',
              color: '#333',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s ease',
            }}
          />
          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.9)',
              color: '#333',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s ease',
            }}
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <input
          type="text"
          name="instructor"
          placeholder="Instructor Name"
          value={form.instructor}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.3)',
            background: 'rgba(255,255,255,0.9)',
            color: '#333',
            fontSize: '1rem',
            outline: 'none',
            transition: 'all 0.3s ease',
          }}
        />
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                background: 'rgba(255,255,255,0.9)',
                color: primaryColor,
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                ':hover': {
                  background: 'rgba(255,255,255,1)',
                },
              }}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              background: 'rgba(255,255,255,0.9)',
              color: primaryColor,
              fontSize: '0.9rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              ':hover': {
                background: 'rgba(255,255,255,1)',
              },
            }}
          >
            {editingId ? 'Update Course' : 'Add Course'}
          </button>
        </div>
      </form>

      {/* Search Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search courses..."
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '500px',
            margin: '0 auto',
            display: 'block',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: `1px solid ${primaryColorLighter}`,
            background: '#fff',
            color: '#333',
            fontSize: '1rem',
            outline: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        />
      </div>

      {/* Courses Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {filteredCourses.map((course) => (
          <div
            key={course._id}
            style={{
              background: primaryColor,
              borderRadius: '12px',
              padding: '1.5rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              ':hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
              },
            }}
          >
            <h3
              style={{
                margin: '0 0 1rem 0',
                color: '#fff',
                fontSize: '1.25rem',
                fontWeight: '600',
              }}
            >
              {course.title}
            </h3>
            <p
              style={{
                color: 'rgba(255,255,255,0.9)',
                marginBottom: '1.5rem',
                lineHeight: '1.5',
              }}
            >
              {course.description}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}
            >
              <div>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.8rem',
                    margin: '0 0 0.25rem 0',
                  }}
                >
                  Duration
                </p>
                <p
                  style={{
                    color: '#fff',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    margin: 0,
                  }}
                >
                  {course.duration}
                </p>
              </div>
              <div>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.8rem',
                    margin: '0 0 0.25rem 0',
                  }}
                >
                  Level
                </p>
                <p
                  style={{
                    color:
                      course.level === 'Beginner' ? '#a2f5c8' : course.level === 'Intermediate' ? '#a2d6f5' : '#d6a2f5',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    margin: 0,
                  }}
                >
                  {course.level}
                </p>
              </div>
              <div>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.8rem',
                    margin: '0 0 0.25rem 0',
                  }}
                >
                  Instructor
                </p>
                <p
                  style={{
                    color: '#fff',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    margin: 0,
                  }}
                >
                  {course.instructor}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => handleEdit(course)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'rgba(255,255,255,0.9)',
                  color: primaryColor,
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  flex: 1,
                  ':hover': {
                    background: '#fff',
                  },
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(course._id)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  flex: 1,
                  ':hover': {
                    background: 'rgba(255,255,255,0.3)',
                  },
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard

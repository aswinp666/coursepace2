import { useState } from 'react'
import { useRouter } from 'next/router'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      setLoading(false)

      if (res.ok) {
        localStorage.setItem('token', data.token) // <=== Save token here
        router.push('/')
      } else {
        setError(data.error || 'Invalid email or password')
      }
    } catch (error) {
      setLoading(false)
      setError('Something went wrong. Try again.')
      console.error('Login Error:', error)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, rgba(18, 124, 113, 0.2) 0%, rgba(18, 124, 113, 0.1) 100%)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          borderRadius: '24px',
          padding: '40px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }}
      >
        <h2
          style={{
            color: '#127C71',
            marginBottom: '30px',
            fontSize: '28px',
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          Welcome Back
        </h2>

        {error && (
          <div
            style={{
              backgroundColor: 'rgba(255, 99, 71, 0.2)',
              color: '#ff6347',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              border: '1px solid rgba(255, 99, 71, 0.3)',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '12px',
                border: '1px solid rgba(18, 124, 113, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              }}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '12px',
                border: '1px solid rgba(18, 124, 113, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: '#127C71',
              color: 'white',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(18, 124, 113, 0.3)',
              opacity: loading ? '0.7' : '1',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {loading ? (
              <>
                <span
                  className="spinner"
                  style={{
                    width: '18px',
                    height: '18px',
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                  }}
                />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div
          style={{
            marginTop: '20px',
            textAlign: 'center',
            color: 'rgba(0, 0, 0, 0.6)',
            fontSize: '14px',
          }}
        >
          Don't have an account?{' '}
          <a href="/signup" style={{ color: '#127C71', fontWeight: '500' }}>
            Sign up
          </a>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        input:focus {
          border-color: #127c71 !important;
          box-shadow: 0 0 0 2px rgba(18, 124, 113, 0.2) !important;
        }

        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(18, 124, 113, 0.4) !important;
        }
      `}</style>
    </div>
  )
}

export default SignIn

// FIXED

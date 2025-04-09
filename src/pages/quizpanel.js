import { useEffect, useState } from 'react'

export default function QuizPanel() {
  const [quizData, setQuizData] = useState([])

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch('/api/scores')
        const data = await res.json()
        setQuizData(data.data)
      } catch (err) {
        console.error('Error fetching scores:', err)
      }
    }

    fetchScores()
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '24px',
        background: 'linear-gradient(135deg,rgb(19, 132, 68) 0%,rgb(10, 106, 100) 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          width: '100%',
          maxWidth: '900px',
          padding: '32px',
          margin: '0 auto',
        }}
      >
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: 'white',
            textAlign: 'center',
            marginBottom: '8px',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          Quiz Panel
        </h1>
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            marginBottom: '32px',
            fontSize: '1rem',
          }}
        >
          View all quiz results and scores
        </p>

        {quizData.length === 0 ? (
          <div
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '32px',
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            <p>No Quiz Data Found</p>
          </div>
        ) : (
          <div
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      padding: '16px 24px',
                      textAlign: 'left',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontWeight: '500',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    Username
                  </th>
                  <th
                    style={{
                      padding: '16px 24px',
                      textAlign: 'left',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontWeight: '500',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    Score
                  </th>
                  <th
                    style={{
                      padding: '16px 24px',
                      textAlign: 'left',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontWeight: '500',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody>
                {quizData.map((item, index) => (
                  <tr
                    key={index}
                    style={{
                      ...(index !== quizData.length - 1 ? { borderBottom: '1px solid rgba(255, 255, 255, 0.05)' } : {}),
                      transition: 'background-color 0.2s ease',
                      ':hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      },
                    }}
                  >
                    <td
                      style={{
                        padding: '16px 24px',
                        color: 'white',
                      }}
                    >
                      {item.quizuserName}
                    </td>
                    <td
                      style={{
                        padding: '16px 24px',
                        color: 'white',
                      }}
                    >
                      {item.score}
                    </td>
                    <td
                      style={{
                        padding: '16px 24px',
                        color: 'white',
                      }}
                    >
                      {item.percentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

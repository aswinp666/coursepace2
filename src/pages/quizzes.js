import { useState } from 'react'
import Head from 'next/head'

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [quizuserName, setQuizUserName] = useState('')
  const [quizStarted, setQuizStarted] = useState(false)

  const questions = [
    {
      question: 'What is the virtual DOM in React?',
      options: [
        'A lightweight copy of the actual DOM',
        'A browser extension for React development',
        'A security feature in React',
        'A state management tool',
      ],
      correctAnswer: 1,
      category: 'React',
    },
    {
      question: 'Which CSS property is used to create rounded corners?',
      options: ['border-radius', 'corner-radius', 'border-style', 'border-round'],
      correctAnswer: 3,
      category: 'CSS',
    },
    {
      question: 'What does UX stand for in design?',
      options: ['User Experience', 'User Example', 'Universal Experience', 'User Extension'],
      correctAnswer: 0,
      category: 'UX',
    },
    {
      question: 'Which HTML5 tag is used for drawing graphics via scripting?',
      options: ['<canvas>', '<svg>', '<graphics>', '<draw>'],
      correctAnswer: 2,
      category: 'HTML',
    },
    {
      question: "What is the purpose of the 'key' prop in React lists?",
      options: [
        'Helps React identify which items have changed',
        'Provides encryption for list items',
        'Styles the list items',
        'Creates unique routes for each item',
      ],
      correctAnswer: 1,
      category: 'React',
    },
    {
      question: 'Which Bootstrap class creates a full-width container?',
      options: ['container-fluid', 'container-full', 'container-wide', 'container-max'],
      correctAnswer: 2,
      category: 'Bootstrap',
    },
    {
      question: 'What is the CSS specificity value of an ID selector?',
      options: ['100', '10', '1000', '1'],
      correctAnswer: 1,
      category: 'CSS',
    },
    {
      question: 'Which JavaScript method is used to execute a function after a specified delay?',
      options: ['setTimeout()', 'delay()', 'waitFor()', 'executeAfter()'],
      correctAnswer: 0,
      category: 'JavaScript',
    },
    {
      question: 'What is the purpose of React hooks?',
      options: [
        'To use state and other React features without writing classes',
        'To connect to external APIs',
        'To style components',
        'To optimize performance',
      ],
      correctAnswer: 3,
      category: 'React',
    },
    {
      question: 'Which color model is best for digital designs?',
      options: ['RGB', 'CMYK', 'Pantone', 'RAL'],
      correctAnswer: 1,
      category: 'UI',
    },
  ]

  const submitScore = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizuserName,
          score,
          totalQuestions: questions.length,
          percentage: Math.round((score / questions.length) * 100),
          categories: calculateCategoryScores(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save score')
      }

      setSubmitSuccess(true)
      console.log('Score saved:', data.data)
    } catch (error) {
      console.error('Save score error:', error)
      setSubmitError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const calculateCategoryScores = () => {
    const categoryResults = {}

    questions.forEach((q, index) => {
      if (!categoryResults[q.category]) {
        categoryResults[q.category] = { correct: 0, total: 0 }
      }
      categoryResults[q.category].total++

      // Use the stored selected answer instead of selectedOptions
      if (selectedAnswers[index] === q.correctAnswer) {
        categoryResults[q.category].correct++
      }
    })

    // Convert to percentage per category
    const formattedResults = {}
    Object.keys(categoryResults).forEach((category) => {
      formattedResults[category] = Math.round(
        (categoryResults[category].correct / categoryResults[category].total) * 100
      )
    })

    return formattedResults
  }

  const handleAnswerOptionClick = (selectedAnswer) => {
    // Store the selected answer for this question
    setSelectedAnswers([...selectedAnswers, selectedAnswer])
    setSelectedOption(selectedAnswer)

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion)
        setSelectedOption(null)
      } else {
        setShowScore(true)
        submitScore()
      }
    }, 500)
  }

  const startQuiz = () => {
    if (quizuserName.trim() === '') {
      alert('Please enter your name to start the quiz')
      return
    }
    setQuizStarted(true)
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    setSelectedOption(null)
    setSelectedAnswers([])
    setSubmitSuccess(false)
    setSubmitError(null)
    setQuizStarted(false)
    setQuizUserName('')
  }

  return (
    <div className="quiz-container">
      <Head>
        <title>Coursespace Quiz</title>
        <meta name="description" content="Test your web development knowledge" />
      </Head>

      <div className="quiz-content">
        <h1 className="quiz-title">Web Development Quiz</h1>

        <div className="quiz-card">
          {!quizStarted ? (
            <div className="start-section">
              <h2 className="welcome-text">Welcome to the Quiz!</h2>
              <p className="instructions">
                Please enter your name below to begin the quiz. You'll be tested on various web development topics.
              </p>

              <div className="name-input-container">
                <input
                  type="text"
                  value={quizuserName}
                  onChange={(e) => setQuizUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="name-input"
                />
                <button onClick={startQuiz} className="start-button">
                  Start Quiz
                </button>
              </div>
            </div>
          ) : showScore ? (
            <div className="score-section">
              <h2 className="score-text">
                {quizuserName}, your score: <span className="score-number">{score}</span> out of {questions.length}
              </h2>

              <p className="score-message">
                {score >= questions.length * 0.8
                  ? "🎉 Excellent! You're a web development expert!"
                  : score >= questions.length * 0.6
                  ? '👍 Good job! You have solid web development knowledge!'
                  : '📚 Keep learning! Review the topics and try again!'}
              </p>

              {isSubmitting && <p className="submission-status">Saving your score...</p>}
              {submitError && <p className="error-message">Error: {submitError}</p>}
              {submitSuccess && <p className="success-message">Score saved successfully!</p>}

              <button onClick={restartQuiz} className="restart-button" disabled={isSubmitting}>
                Restart Quiz
              </button>
            </div>
          ) : (
            <>
              <div className="quiz-header">
                <span className="question-count">
                  Question {currentQuestion + 1}/{questions.length}
                </span>
                <span className="user-name">Player: {quizuserName}</span>
                <span className="question-category">{questions[currentQuestion].category}</span>
              </div>

              <div className="question-text">
                <h2>{questions[currentQuestion].question}</h2>
              </div>

              <div className="options-grid">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerOptionClick(index)}
                    disabled={selectedOption !== null}
                    className={`option-button ${
                      selectedOption !== null
                        ? index === questions[currentQuestion].correctAnswer
                          ? 'correct'
                          : index === selectedOption
                          ? 'incorrect'
                          : 'disabled'
                        : ''
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  }}
                ></div>
              </div>
            </>
          )}
        </div>

        <footer className="quiz-footer">
          <p>Test your knowledge of React, UI/UX, CSS, HTML, JavaScript, and Bootstrap</p>
        </footer>
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .quiz-container {
          min-height: 100vh;
          padding: 2rem;
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          color: white;
        }

        .quiz-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .start-section {
          text-align: center;
          padding: 2rem;
        }

        .welcome-text {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: white;
        }

        .instructions {
          font-size: 1rem;
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
        }

        .name-input-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 400px;
          margin: 0 auto;
        }

        .name-input {
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .name-input:focus {
          border-color: #00c9ff;
          box-shadow: 0 0 0 2px rgba(0, 201, 255, 0.2);
        }

        .name-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .start-button {
          padding: 1rem;
          background: linear-gradient(90deg, #00c9ff, #92fe9d);
          color: #0f2027;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .start-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 201, 255, 0.3);
        }

        .user-name {
          font-size: 0.9rem;
          color: white;
          background: rgba(0, 0, 0, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 50px;
        }

        .quiz-title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 2rem;
          background: linear-gradient(90deg, #00c9ff, #92fe9d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .quiz-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.18);
          transition: all 0.3s ease;
        }

        .quiz-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .question-count {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
          background: rgba(0, 0, 0, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 50px;
        }

        .question-category {
          font-size: 0.9rem;
          color: white;
          background: linear-gradient(90deg, #ff758c, #ff7eb3);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-weight: 600;
        }

        .question-text h2 {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          line-height: 1.4;
          color: white;
        }

        .options-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        @media (min-width: 768px) {
          .options-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .option-button {
          padding: 1.25rem;
          text-align: left;
          border-radius: 12px;
          border: none;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .option-button:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .option-button:disabled {
          cursor: not-allowed;
        }

        .correct {
          background: rgba(40, 167, 69, 0.7) !important;
          border-color: rgba(40, 167, 69, 0.9) !important;
        }

        .incorrect {
          background: rgba(220, 53, 69, 0.7) !important;
          border-color: rgba(220, 53, 69, 0.9) !important;
        }

        .disabled {
          opacity: 0.7;
        }

        .progress-container {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #00c9ff, #92fe9d);
          border-radius: 3px;
          transition: width 0.5s ease;
        }

        .score-section {
          text-align: center;
          padding: 2rem 0;
        }

        .score-text {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: white;
        }

        .score-number {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(90deg, #00c9ff, #92fe9d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .score-message {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .restart-button {
          padding: 0.75rem 2rem;
          background: linear-gradient(90deg, #00c9ff, #92fe9d);
          color: #0f2027;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 201, 255, 0.3);
        }

        .restart-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 201, 255, 0.4);
        }

        .quiz-footer {
          margin-top: 2rem;
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }

        .submission-status {
          color: #aaa;
          margin: 1rem 0;
        }

        .success-message {
          color: #4caf50;
          margin: 1rem 0;
        }

        .error-message {
          color: #f44336;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  )
}

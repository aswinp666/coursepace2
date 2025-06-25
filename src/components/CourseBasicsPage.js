import React, { useState } from 'react'
import styles from './CourseBasicsPage.module.css' // Import CSS Modules

const CourseBasicsPage = () => {
  const [currentLevel, setCurrentLevel] = useState(1)
  const totalLevels = 10

  const handleNextLevel = () => {
    if (currentLevel < totalLevels) {
      setCurrentLevel(currentLevel + 1)
    }
  }

  const handlePreviousLevel = () => {
    if (currentLevel > 1) {
      setCurrentLevel(currentLevel - 1)
    }
  }

  const handleDownloadCertificate = () => {
    alert('Certificate download functionality will be implemented later.')
  }

  const renderLevelContent = () => {
    return <p>This is content for Level {currentLevel}. Read through this carefully.</p>
  }

  if (currentLevel > totalLevels) {
    return (
      <div className={`${styles['course-basics-page']} ${styles.completed}`}>
        <h1>Course Completed Successfully!</h1>
        <p>Congratulations on completing the course basics.</p>
        <button onClick={handleDownloadCertificate} className={styles['download-certificate-btn']}>
          Download Certificate
        </button>
      </div>
    )
  }

  return (
    <div className={styles['course-basics-page']}>
      {/* Change <header> to a <div> or simply just use the h1 directly */}
      <div className={styles['course-header']}>
        <h1>
          Course Basics - Level {currentLevel} / {totalLevels}
        </h1>
      </div>
      <main className={styles['level-content']}>{renderLevelContent()}</main>
      <div className={styles['stepper-controls']}>
        <button onClick={handlePreviousLevel} disabled={currentLevel === 1}>
          Previous
        </button>
        <span>
          Level {currentLevel} of {totalLevels}
        </span>
        {currentLevel < totalLevels ? (
          <button onClick={handleNextLevel}>Next</button>
        ) : (
          <button onClick={() => setCurrentLevel(currentLevel + 1)}>Complete Course</button>
        )}
      </div>
    </div>
  )
}

export default CourseBasicsPage

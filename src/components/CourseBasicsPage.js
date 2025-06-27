import React, { useState } from 'react'
import styles from './CourseBasicsPage.module.css'
import { jsPDF } from 'jspdf' // Import jsPDF

const CourseBasicsPage = () => {
  const [currentLevel, setCurrentLevel] = useState(1)
  const totalLevels = 5

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
    const doc = new jsPDF()

    // Basic Certificate Content
    doc.setFontSize(22)
    doc.text('Certificate of Completion', 20, 30)

    doc.setFontSize(14)
    doc.text('This certifies that', 20, 50)

    doc.setFontSize(20)
    doc.text('John Doe', 20, 65) // Replace with actual user name

    doc.setFontSize(14)
    doc.text('has successfully completed the', 20, 80)
    doc.text('React Basics Course', 20, 90)

    doc.setFontSize(12)
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 110)

    doc.save('React_Basics_Certificate.pdf')
  }

  const renderLevelContent = () => {
    switch (currentLevel) {
      case 1:
        return (
          <>
            <h2>Level 1: Introduction to React</h2>
            <p>
              React is a JavaScript library for building user interfaces. It allows developers to create reusable UI
              components, making the development process more efficient and maintainable. React uses a virtual DOM to
              optimize updates, leading to fast and responsive applications.
            </p>
            <p>
              Key concepts in React include components, JSX, props, state, and the component lifecycle. We will explore
              these concepts in detail in the following levels.
            </p>
            <p>
              To get started with React, you typically set up a development environment using tools like Create React
              App, which provides a comfortable environment for learning React.
            </p>
          </>
        )
      case 2:
        return (
          <>
            <h2>Level 2: React Components and JSX</h2>
            <p>
              In React, everything is a component. Components are independent, reusable pieces of UI. They can be
              functional components (simple JavaScript functions) or class components (ES6 classes).
            </p>
            <p>
              JSX (JavaScript XML) is a syntax extension for JavaScript, recommended by React for describing what the UI
              should look like. It allows you to write HTML-like syntax directly within your JavaScript code.
            </p>
            <h3>Example of a functional component with JSX:</h3>
            <pre>
              <code>
                {`import React from 'react';

function WelcomeMessage() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <p>Welcome to your first React component.</p>
    </div>
  );
}

export default WelcomeMessage;`}
              </code>
            </pre>
          </>
        )
      case 3:
        return (
          <>
            <h2>Level 3: State and Props in React</h2>
            <p>
              **Props (short for properties)** are a way of passing data from a parent component to a child component.
              They are read-only and help make components reusable.
            </p>
            <p>
              **State** is data that a component manages internally and can change over time. When the state changes,
              the component re-renders to reflect the new data. The `useState` hook is used in functional components to
              add state.
            </p>
            <h3>Understanding State and Props:</h3>
            <img
              src="https://via.placeholder.com/600x300?text=React+State+and+Props"
              alt="React State and Props Diagram"
              style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }}
            />
            <p>
              Consider the image above, where data flows unidirectionally from parent to child via props, while state is
              internal to a component and can be updated.
            </p>
            <h3>Video Explanation:</h3>
            <div
              style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                overflow: 'hidden',
                maxWidth: '100%',
                background: '#000',
              }}
            >
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src="https://www.youtube.com/embed/O6P86uwfdR0" // Example YouTube embed for React State & Props
                title="React State and Props Explained"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p style={{ marginTop: '20px' }}>
              Watch the video above for a detailed explanation of state and props in React.
            </p>
          </>
        )
      case 4:
        return (
          <>
            <h2>Level 4: React Hooks (useState and useEffect)</h2>
            <p>
              React Hooks are functions that let you "hook into" React features from your functional components. They
              allow you to use state and other React features without writing a class.
            </p>
            <p>The `useState` hook, which we briefly touched upon, allows functional components to have state.</p>
            <p>
              The `useEffect` hook lets you perform side effects in functional components. This includes data fetching,
              subscriptions, or manually changing the DOM. It runs after every render of the component, by default.
            </p>
            <h3>Using `useEffect` for data fetching:</h3>
            <pre>
              <code>
                {`import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
      <h2>Users:</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;`}
              </code>
            </pre>
          </>
        )
      case 5:
        return (
          <>
            <h2>Level 5: Conditional Rendering and List Rendering</h2>
            <p>
              **Conditional rendering** in React allows you to render different elements or components based on certain
              conditions. This is a powerful way to create dynamic UIs.
            </p>
            <p>
              **List rendering** is about rendering collections of data. In React, you typically use the `map()` array
              method to iterate over an array and return a list of React elements. It's crucial to provide a unique
              `key` prop for each item in a list to help React efficiently update the UI.
            </p>
            <h3>Example of Conditional Rendering:</h3>
            <img
              src="https://via.placeholder.com/600x300?text=React+Conditional+Rendering"
              alt="React Conditional Rendering Flow"
              style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }}
            />
            <p>This image illustrates how different UI parts can be shown or hidden based on conditions.</p>
            <h3>Video on List Rendering:</h3>
            <div
              style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                overflow: 'hidden',
                maxWidth: '100%',
                background: '#000',
              }}
            >
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src="https://www.youtube.com/embed/b0b5J3h5u9k" // Example YouTube embed for React List Rendering
                title="React List Rendering Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p style={{ marginTop: '20px' }}>
              Learn more about rendering lists of data in React by watching the video above.
            </p>
          </>
        )
      default:
        return <p>This is content for Level {currentLevel}. Read through this carefully.</p>
    }
  }

  if (currentLevel > totalLevels) {
    return (
      <div className={`${styles['course-basics-page']} ${styles.completed}`}>
        <h1 className={styles['completion-heading']}> Course Completed Successfully!</h1>
        <p className={styles['completion-message']}>
          Congratulations on mastering the React Basics. You're now ready for more advanced topics!
        </p>
        <button onClick={handleDownloadCertificate} className={styles['download-certificate-btn']}>
          Download Your Certificate
        </button>
        <p className={styles['congratulations']}>Well done, future React developer!</p>
      </div>
    )
  }

  return (
    <div className={styles['course-basics-page']}>
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

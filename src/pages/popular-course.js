import React, { useState, useEffect } from 'react'

const OnlineVideoCourses = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch all videos from the server
  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos')
      const data = await response.json()
      setVideos(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching videos:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  // Filter videos based on search query
  const filteredVideos = videos.filter((video) => video.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Glassmorphism styles with green theme
  const styles = {
    mainContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      padding: '24px',
      color: 'white',
      fontFamily: '"Roboto", sans-serif',
    },
    contentContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
    },
    header: {
      marginBottom: '32px',
      textAlign: 'center',
    },
    title: {
      fontSize: '42px',
      fontWeight: '700',
      marginBottom: '8px',
      background: 'linear-gradient(90deg, #00c853, #64dd17)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '0 2px 4px rgba(0,0,0,0.2)',
    },
    subtitle: {
      color: '#b2ff59',
      fontSize: '18px',
      opacity: '0.9',
    },
    searchBar: {
      display: 'flex',
      margin: '24px 0',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    searchInput: {
      flex: '1',
      padding: '12px 16px',
      borderRadius: '24px 0 0 24px',
      border: 'none',
      outline: 'none',
      fontSize: '16px',
      background: 'rgba(255,255,255,0.15)',
      color: 'white',
      backdropFilter: 'blur(5px)',
    },
    searchButton: {
      padding: '12px 20px',
      borderRadius: '0 24px 24px 0',
      border: 'none',
      background: 'linear-gradient(90deg, #00c853, #64dd17)',
      color: 'white',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    glassCard: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px 0 rgba(0, 100, 0, 0.2)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '32px',
    },
    videoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px',
      padding: '16px 0',
    },
    videoCard: {
      background: 'rgba(30, 70, 40, 0.4)',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      ':hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 20px rgba(0, 200, 83, 0.2)',
      },
    },
    videoThumbnail: {
      position: 'relative',
      paddingTop: '56.25%' /* 16:9 aspect ratio */,
    },
    videoPlayer: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    videoInfo: {
      padding: '16px',
    },
    videoTitle: {
      fontSize: '16px',
      fontWeight: '500',
      marginBottom: '8px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    videoMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      color: '#b2ff59',
      fontSize: '14px',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '300px',
    },
    spinner: {
      border: '4px solid rgba(0, 200, 83, 0.3)',
      borderTop: '4px solid #00c853',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      animation: 'spin 1s linear infinite',
    },
    emptyState: {
      textAlign: 'center',
      padding: '48px 0',
      color: '#b2ff59',
    },
  }

  return (
    <div style={styles.mainContainer}>
      <div style={styles.contentContainer}>
        {/* Header */}
        <header style={styles.header}>
          <h1 style={styles.title}>Online Video Courses</h1>
          <p style={styles.subtitle}>Learn from the best curated video content</p>
        </header>

        {/* Search Bar */}
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <button style={styles.searchButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              style={{ marginRight: '8px' }}
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            Search
          </button>
        </div>

        {/* Video Gallery */}
        <div style={styles.glassCard}>
          {loading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.spinner}></div>
            </div>
          ) : filteredVideos.length === 0 ? (
            <div style={styles.emptyState}>
              {searchQuery ? (
                <p>No videos found matching your search.</p>
              ) : (
                <p>No videos available yet. Check back soon!</p>
              )}
            </div>
          ) : (
            <div style={styles.videoGrid}>
              {filteredVideos.map((video) => (
                <div key={video.name} style={styles.videoCard}>
                  <div style={styles.videoThumbnail}>
                    <video src={video.url} style={styles.videoPlayer} controls />
                  </div>
                  <div style={styles.videoInfo}>
                    <h3 style={styles.videoTitle}>{video.name}</h3>
                    <div style={styles.videoMeta}>
                      <span>Video Course</span>
                      <span>•</span>
                      <span>Free</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        body {
          margin: 0;
          font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Fira Sans',
            'Droid Sans', 'Helvetica Neue', sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        button:hover {
          opacity: 0.9;
          transform: scale(1.02);
        }
      `}</style>
    </div>
  )
}

export default OnlineVideoCourses

import React, { useState, useEffect } from 'react'

const VideoUpload = () => {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [videos, setVideos] = useState([])
  const [previewUrl, setPreviewUrl] = useState(null)

  // Fetch existing videos from the server
  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos')
      const data = await response.json()
      setVideos(data)
    } catch (error) {
      console.error('Error fetching videos:', error)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)

    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile)
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }
  }

  // Handle file upload
  const handleUpload = async () => {
    if (!file) return alert('Please select a video file')

    const formData = new FormData()
    formData.append('file', file)

    setLoading(true)

    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        alert('Video uploaded successfully!')
        setFile(null)
        setPreviewUrl(null)
        fetchVideos()
      } else {
        alert('Error uploading video')
      }
    } catch (error) {
      console.error('Error uploading video:', error)
      alert('Error uploading video')
    } finally {
      setLoading(false)
    }
  }

  // Handle video deletion
  const handleDelete = async (fileName) => {
    const confirmed = window.confirm('Are you sure you want to delete this video?')
    if (!confirmed) return

    try {
      const response = await fetch(`/api/videos?fileName=${fileName}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (response.ok) {
        alert('Video deleted successfully!')
        fetchVideos()
      } else {
        alert('Error deleting video')
      }
    } catch (error) {
      console.error('Error deleting video:', error)
      alert('Error deleting video')
    }
  }

  // Glassmorphism styles
  const glassCard = {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '32px',
  }

  const mainContainer = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #8E0E00 0%, #1F1C18 50%, #0F2027 100%)',
    padding: '24px',
    color: 'white',
  }

  const contentContainer = {
    maxWidth: '1200px',
    margin: '0 auto',
  }

  const uploadButton = {
    backgroundColor: '#FF0000',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    marginTop: '16px',
  }

  const disabledButton = {
    backgroundColor: '#555',
    cursor: 'not-allowed',
  }

  const videoGrid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
  }

  const videoCard = {
    background: 'rgba(40, 40, 40, 0.6)',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  }

  return (
    <div style={mainContainer}>
      <div style={contentContainer}>
        {/* Header */}
        <header style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px' }}>Video Gallery</h1>
          <p style={{ color: '#aaa' }}>Upload and manage your video collection</p>
        </header>

        {/* Upload Section */}
        <div style={glassCard}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Upload New Video</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Preview Section */}
            {previewUrl ? (
              <div style={{ flex: 1 }}>
                <video
                  src={previewUrl}
                  controls
                  style={{
                    width: '100%',
                    height: '256px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  }}
                />
                <p style={{ marginTop: '8px', color: '#ccc', fontSize: '14px' }}>{file.name}</p>
              </div>
            ) : (
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(50, 50, 50, 0.5)',
                  borderRadius: '8px',
                  padding: '32px',
                  border: '2px dashed #666',
                }}
              >
                <p style={{ color: '#888' }}>Video preview will appear here</p>
              </div>
            )}

            {/* Upload Controls */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <label style={{ marginBottom: '16px' }}>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="file-upload"
                />
                <div
                  style={{
                    backgroundColor: '#FF0000',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Select Video File
                </div>
              </label>

              <button
                onClick={handleUpload}
                disabled={loading || !file}
                style={{
                  ...uploadButton,
                  ...(loading || !file ? disabledButton : { backgroundColor: '#3B82F6' }),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {loading ? (
                  <>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '20px',
                        height: '20px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTopColor: 'white',
                        borderRadius: '50%',
                        marginRight: '8px',
                        animation: 'spin 1s linear infinite',
                      }}
                    ></span>
                    Uploading...
                  </>
                ) : (
                  'Upload Video'
                )}
              </button>

              {file && (
                <button
                  onClick={() => {
                    setFile(null)
                    setPreviewUrl(null)
                  }}
                  style={{
                    marginTop: '8px',
                    color: '#aaa',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Video List Section */}
        <div style={glassCard}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>Your Videos</h2>

          {videos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <p style={{ color: '#888' }}>No videos uploaded yet.</p>
            </div>
          ) : (
            <div style={videoGrid}>
              {videos.map((video) => (
                <div key={video.name} style={videoCard}>
                  <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                    <video
                      src={video.url}
                      controls
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h3
                      style={{
                        color: 'white',
                        fontWeight: '500',
                        marginBottom: '8px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {video.name}
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => handleDelete(video.name)}
                        style={{
                          color: '#FF6B6B',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ width: '20px', height: '20px', marginRight: '4px' }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
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
          to {
            transform: rotate(360deg);
          }
        }

        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans',
            'Droid Sans', 'Helvetica Neue', sans-serif;
        }

        button:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  )
}

export default VideoUpload

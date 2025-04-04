import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/router";



export default function Courses() {
  const videoRefs = useRef([]);
  const router = useRouter(); 

  

  useEffect(() => {
    AOS.init({ 
      duration: 1000,
      once: true
    }); 
  }, []);

  const handleVideoPlay = (currentIndex) => {
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex) {
        video.pause();
      }
    });
  };



  
  const courses = [
    {
      title: "Android Development",
      description: "Learn to build modern Android apps with Jetpack Compose, Kotlin, and best practices.",
      video: "/videos/What is Android Development _ Android Development in 3-Minutes _ Android Development _ Intellipaat.mp4",
      duration: "8 Weeks",
      level: "Intermediate",
      students: "1.2k enrolled"
    },
    {
      title: "UI/UX Complete Guide",
      description: "Master UI/UX design principles with Figma, Adobe XD, and real-world projects.",
      video: "/videos/UI UX in 5 Minutes _ What is UI _ What is UX _ UI UX Design _ Intellipaat.mp4",
      duration: "6 Weeks",
      level: "Beginner",
      students: "2.5k enrolled"
    },
    {
      title: "Mastering Data Modeling Fundamentals",
      description: "Understand database design, normalization, and real-world data modeling techniques.",
      video: "/videos/What is Data Modeling  _ IDERA Data University.mp4",
      duration: "4 Weeks",
      level: "Advanced",
      students: "850 enrolled"
    },
    {
      title: "Modern React with Next.js",
      description: "Build stylish and responsive React applications with best practices.",
      video: "/videos/React in 100 Seconds.mp4",
      duration: "5 Weeks",
      level: "Intermediate",
      students: "3.1k enrolled"
    },
  ];


  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Explore Our <span style={styles.highlight}>Premium</span> Courses</h1>
        <p style={styles.subheading}>Handcrafted learning experiences from industry experts</p>
      </div>
      
      <div style={styles.coursesGrid}>
        {courses.map((course, index) => (
          <div key={index} style={styles.courseCard} data-aos="fade-up">
            <div style={styles.videoContainer}>
              <div style={styles.videoWrapper}>
                <video 
                  style={styles.video} 
                  controls 
                  poster="/images/video-placeholder.jpg"
                  ref={el => videoRefs.current[index] = el}
                  onPlay={() => handleVideoPlay(index)}
                >
                  <source src={course.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            <div style={styles.courseDetails}>
              <div style={styles.courseHeader}>
                <div style={styles.levelBadge}>{course.level}</div>
                <div style={styles.duration}>{course.duration}</div>
              </div>
              
              <h2 style={styles.courseTitle}>{course.title}</h2>
              <p style={styles.courseDescription}>{course.description}</p>
              
              <div style={styles.metaInfo}>
                <div style={styles.students}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#6B7280"/>
                    <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#6B7280"/>
                  </svg>
                  {course.students}
                </div>
              </div>
              
              <div style={styles.actionBar}>
                <button style={styles.enrollBtn} onClick={() => router.push("/enroll")}>
                  Enroll Now
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button style={styles.previewBtn}>
                  Preview Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to advance your career?</h2>
        <p style={styles.ctaText}>Join thousands of students learning with our premium courses</p>
        <button style={styles.ctaButton}>Browse All Courses</button>
      </div>
    </div>
  );
}


const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "60px 20px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    backgroundColor: "#fefefe",
  },
  header: {
    textAlign: "center",
    marginBottom: "60px",
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  heading: {
    fontSize: "3rem",
    fontWeight: "700",
    marginBottom: "16px",
    color: "#111827",
    lineHeight: "1.2",
    background: "linear-gradient(90deg, #059669,rgb(9, 145, 100))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block",
  },
  highlight: {
    fontWeight: "800",
  },
  subheading: {
    fontSize: "1.25rem",
    color: "#6B7280",
    fontWeight: "400",
    marginBottom: "0",
  },
  coursesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
    gap: "30px",
    '@media (max-width: 768px)': {
      gridTemplateColumns: "1fr",
    }
  },
  courseCard: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
    border: "1px solid rgba(0, 0, 0, 0.05)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    ':hover': {
      transform: "translateY(-5px)",
      boxShadow: "0 15px 40px rgba(0, 0, 0, 0.1)",
    },
  },
  videoContainer: {
    flex: "1",
    position: "relative",
  },
  videoWrapper: {
    position: "relative",
    paddingBottom: "56.25%",
    height: "0",
    overflow: "hidden",
    backgroundColor: "#000",
    'video::-webkit-media-controls-play-button': {
      display: "none !important",
    },
    'video::-webkit-media-controls-start-playback-button': {
      display: "none !important",
    }
  },
  video: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    '&::-webkit-media-controls-panel': {
      display: "none !important",
    },
  },
  courseDetails: {
    flex: "1",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
  },
  courseHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
    gap: "12px",
  },
  levelBadge: {
    backgroundColor: "#D1FAE5",
    color: "#065F46",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  duration: {
    color: "#6B7280",
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
    '::before': {
      content: '"⏱"',
      marginRight: "4px",
    },
  },
  courseTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    margin: "0 0 12px 0",
    color: "#111827",
    lineHeight: "1.3",
  },
  courseDescription: {
    fontSize: "1rem",
    color: "#6B7280",
    margin: "0 0 20px 0",
    lineHeight: "1.6",
  },
  metaInfo: {
    display: "flex",
    alignItems: "center",
    marginBottom: "24px",
    color: "#6B7280",
    fontSize: "0.875rem",
  },
  students: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  actionBar: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginTop: "auto",
  },
  enrollBtn: {
    backgroundColor: "#059669",
    color: "white",
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.9375rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    ':hover': {
      backgroundColor: "#047857",
      transform: "translateY(-1px)",
    },
  },
  previewBtn: {
    backgroundColor: "transparent",
    color: "#059669",
    padding: "12px 16px",
    border: "1px solid #D1FAE5",
    borderRadius: "8px",
    fontSize: "0.9375rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    ':hover': {
      backgroundColor: "#D1FAE5",
      color: "#065F46",
    },
  },
  ctaSection: {
    marginTop: "80px",
    textAlign: "center",
    padding: "60px 40px",
    backgroundColor: "#F9FAFB",
    borderRadius: "16px",
    border: "1px solid #E5E7EB",
  },
  ctaTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "16px",
    color: "#111827",
  },
  ctaText: {
    fontSize: "1.125rem",
    color: "#6B7280",
    marginBottom: "32px",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  ctaButton: {
    backgroundColor: "#065F46",
    color: "white",
    padding: "16px 32px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    ':hover': {
      backgroundColor: "#064E3B",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
  },
};
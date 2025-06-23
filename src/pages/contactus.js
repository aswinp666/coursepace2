import React from 'react'
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
} from 'react-icons/fa'
import { motion } from 'framer-motion'

const ContactUs = () => {
  const containerStyle = {
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(16px)',
    borderRadius: '24px',
    padding: '40px',
    maxWidth: '900px',
    margin: '50px auto',
    color: '#1a3e2f',
    fontFamily: "'Inter', sans-serif",
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
  }

  const headerStyle = {
    color: '#1a3e2f',
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '30px',
    position: 'relative',
    display: 'inline-block',
  }

  const headerUnderlineStyle = {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: '0',
    width: '60px',
    height: '4px',
    background: 'linear-gradient(90deg, #2ecc71, #27ae60)',
    borderRadius: '2px',
  }

  const contactItemStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '15px 20px',
    background: 'rgba(233, 250, 240, 0.6)',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 5px 15px rgba(46, 204, 113, 0.2)',
    },
  }

  const iconStyle = {
    fontSize: '22px',
    marginRight: '15px',
    color: '#27ae60',
    flexShrink: '0',
  }

  const textStyle = {
    display: 'flex',
    flexDirection: 'column',
  }

  const labelStyle = {
    fontWeight: '600',
    color: '#1a3e2f',
    marginBottom: '3px',
  }

  const linkStyle = {
    color: '#27ae60',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    ':hover': {
      color: '#2ecc71',
      textDecoration: 'underline',
    },
  }

  const socialIconsStyle = {
    display: 'flex',
    gap: '20px',
    margin: '30px 0',
  }

  const socialIconStyle = {
    fontSize: '26px',
    color: '#1a3e2f',
    transition: 'all 0.3s ease',
    ':hover': {
      color: '#27ae60',
      transform: 'translateY(-3px)',
    },
  }

  const mapStyle = {
    width: '100%',
    height: '350px',
    borderRadius: '18px',
    border: 'none',
    marginTop: '20px',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
  }

  const sectionTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1a3e2f',
    margin: '25px 0 15px',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={containerStyle}
    >
      <h1 style={headerStyle}>
        Get In Touch
        <span style={headerUnderlineStyle}></span>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Left Column - Contact Info */}
        <div>
          <motion.div style={contactItemStyle} whileHover={{ scale: 1.02 }}>
            <FaMapMarkerAlt style={iconStyle} />
            <div style={textStyle}>
              <span style={labelStyle}>Our Location</span>
              <span>UL Cyberpark, Nellikode (PO), Kozhikode, Kerala - 673016</span>
            </div>
          </motion.div>

          <motion.div style={contactItemStyle} whileHover={{ scale: 1.02 }}>
            <FaPhone style={iconStyle} />
            <div style={textStyle}>
              <span style={labelStyle}>Phone Number</span>
              <a href="tel:+914952460000" style={linkStyle}>
                +91 495 246 0000
              </a>
            </div>
          </motion.div>

          <motion.div style={contactItemStyle} whileHover={{ scale: 1.02 }}>
            <FaEnvelope style={iconStyle} />
            <div style={textStyle}>
              <span style={labelStyle}>Email Address</span>
              <a href="mailto:info@ulcyberpark.com" style={linkStyle}>
                info@ulcyberpark.com
              </a>
            </div>
          </motion.div>

          <motion.div style={contactItemStyle} whileHover={{ scale: 1.02 }}>
            <FaGlobe style={iconStyle} />
            <div style={textStyle}>
              <span style={labelStyle}>Website</span>
              <a href="https://ulcyberpark.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                ulcyberpark.com
              </a>
            </div>
          </motion.div>

          <h3 style={sectionTitleStyle}>Connect With Us</h3>
          <div style={socialIconsStyle}>
            {[
              { icon: <FaFacebook />, url: 'https://facebook.com' },
              { icon: <FaTwitter />, url: 'https://twitter.com' },
              { icon: <FaInstagram />, url: 'https://instagram.com' },
              { icon: <FaLinkedin />, url: 'https://linkedin.com' },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={socialIconStyle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right Column - Map */}
        <div>
          <iframe
            title="UL Cyberpark Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.111071879525!2d75.8052103148029!3d11.256753891998426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65b1c7c5d0f4d%3A0x1d1e5e2e5e2e5e2e!2sUL%20CyberPark!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
            style={mapStyle}
            allowFullScreen=""
            loading="lazy"
          />
          <p style={{ textAlign: 'center', marginTop: '10px', color: '#666' }}>Visit our campus at UL Cyberpark</p>
        </div>
      </div>
    </motion.div>
  )
}

export default ContactUs

import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'; // Importing TextField for multiline input
import Button from '@mui/material/Button'; // Importing Material-UI Button

// Define a basic StyledButton component directly here
// In a real application, you might have this in a separate file
const StyledButton = (props: any) => (
  <Button
    variant="contained"
    sx={{
      backgroundColor: 'light green', // Example primary color
      color: 'white',
      borderRadius: 3,
      padding: '12px 24px',
      fontSize: '1rem',
      fontWeight: 'bold',
      textTransform: 'none', // Prevent uppercase transformation
      '&:hover': {
        backgroundColor: '#115293', // Darker shade on hover
      },
    }}
    {...props}
  />
);

const ContactForm: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log('Contact Form Submitted:', { name, email, message });
    // In a real application, you would send this data to your backend server
    // e.g., using fetch or a library like axios.

    // Clear form fields after submission (optional)
    setName('');
    setEmail('');
    setMessage('');

    // You might want to show a success message to the user here
    // For now, we'll just log to console.
    // Replaced alert with a console log or a custom message box as per instructions
    console.log('Thank you for your message! We will get back to you soon.');
  };

  return (
    <Box sx={{ backgroundColor: 'background.paper', py: { xs: 8, md: 10 } }}>
      <Container>
        <Box
          sx={{
            backgroundColor: 'secondary.main',
            borderRadius: 10,
            py: { xs: 4, md: 10 },
            px: { xs: 4, md: 8 },
            textAlign: 'center',
          }}
        >
          <Typography variant="h1" component="h2" sx={{ mb: 1, fontSize: { xs: 32, md: 42 } }}>
            Get in Touch
          </Typography>
          <Typography sx={{ mb: 6 }}>
            Have questions or feedback? Send us a message!
          </Typography>

          <Box
            component="form" // Make this a form element
            onSubmit={handleSubmit} // Attach the submit handler
            sx={{
              display: 'flex',
              flexDirection: 'column', // Stack inputs vertically
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: '100%', md: 560 },
              mx: 'auto',
              gap: 3, // Space between form elements
            }}
          >
            {/* Name Input */}
            <InputBase
              sx={{
                backgroundColor: 'background.paper',
                borderRadius: 3,
                width: '100%',
                height: 48,
                px: 2,
              }}
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required // Make name a required field
            />

            {/* Email Input */}
            <InputBase
              sx={{
                backgroundColor: 'background.paper',
                borderRadius: 3,
                width: '100%',
                height: 48,
                px: 2,
              }}
              placeholder="Your Email Address"
              type="email" // Set type to email for validation
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required // Make email a required field
            />

            {/* Message Input (using TextField for multiline) */}
            <TextField
              sx={{
                backgroundColor: 'background.paper',
                borderRadius: 3,
                width: '100%',
                px: 2,
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Remove default TextField border
                '& .MuiInputBase-input': { padding: '12px 0' }, // Adjust padding for inner input
              }}
              placeholder="Your Message"
              multiline
              rows={5} // Set initial rows for the textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required // Make message a required field
            />

            <Box>
              <StyledButton disableHoverEffect size="large" type="submit"> {/* Set type to submit */}
                Send Message
              </StyledButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactForm;

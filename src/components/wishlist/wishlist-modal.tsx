import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Course } from '@/interfaces/course'; // Assuming Course interface is appropriate

interface WishlistModalProps {
  open: boolean;
  onClose: () => void;
  courses: Course[]; // Or a more specific WishlistItem interface if needed
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const WishlistModal: FC<WishlistModalProps> = ({ open, onClose, courses }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="wishlist-modal-title"
      aria-describedby="wishlist-modal-description"
    >
      <Box sx={modalStyle}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="wishlist-modal-title" variant="h6" component="h2">
          Your Wishlist
        </Typography>
        <Box id="wishlist-modal-description" sx={{ mt: 2 }}>
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <Box key={course.id} sx={{ mb: 2, p: 1, border: '1px solid #eee', borderRadius: 1 }}>
                <Typography variant="subtitle1">{course.title}</Typography>
                {/* Display more course details if needed, e.g., price, small image */}
              </Box>
            ))
          ) : (
            <Typography>Your wishlist is empty.</Typography>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default WishlistModal;

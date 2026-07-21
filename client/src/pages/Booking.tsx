import React from 'react';
import { Box } from '@mui/material';
import BookingForm from '../components/BookingForm';

const Booking: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, #6B0000 0%, #8B0000 50%, #000000 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(circle at 20% 30%, rgba(230, 43, 31, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '300px',
          height: '300px',
          background:
            'radial-gradient(circle, rgba(230, 43, 31, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <BookingForm />
    </Box>
  );
};

export default Booking;
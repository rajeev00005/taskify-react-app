import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: '#000',
        color: '#fff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        py: 6,
      }}
    >
      {/* Subtle Background Accent */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at top right, rgba(0,204,153,0.1), transparent 50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        {/* 404 Number */}
        <Typography
          variant="h1"
          fontWeight="bold"
          sx={{
            fontSize: { xs: '5rem', sm: '7rem' },
            background: 'linear-gradient(90deg, #00cc99, #0066cc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            lineHeight: 1,
          }}
        >
          404
        </Typography>

        {/* Message */}
        <Typography
          variant="h5"
          component="h2"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          Page Not Found
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ mb: 4, lineHeight: 1.7 }}
        >
          Oops! The page you're looking for doesn't exist or has been moved.
        </Typography>

        {/* Back to Home Button */}
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/')}
          sx={{
            backgroundColor: '#00cc99',
            color: '#000',
            fontWeight: 'bold',
            px: 4,
            borderRadius: '999px',
            '&:hover': {
              backgroundColor: '#00b389',
              transform: 'scale(1.05)',
              transition: 'all 0.2s ease',
            },
          }}
        >
          Go to Homepage
        </Button>
      </Container>
    </Box>
  );
};

export default NotFound;
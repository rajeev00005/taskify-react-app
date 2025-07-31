import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  AvatarGroup,
  Avatar,
  Button,
  Skeleton,
  Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';

// Import your sections
import Features from './Features';
import Pricing from './Pricing';
import Testimonial from './Testimonial';
import Blog from './Blog';
import FAQ from './FAQ';

const Home = () => {
  const [loading, setLoading] = useState(true);

  // Simulate real loading (replace with actual data fetch)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2-second delay to clearly see skeleton

    return () => clearTimeout(timer);
  }, []);

  // 🔁 Skeleton for Hero Section
  const HeroSkeleton = () => (
    <Box
      sx={{
        bgcolor: '#000',
        color: '#fff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        pt: 10,
        py: 10,
        position: 'relative',
      }}
    >
      {/* Optional: Dark overlay to make skeleton visible over bright bg */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0, 0, 0, 0.85)', // Ensures skeleton is visible
          zIndex: 1,
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <Skeleton variant="rectangular" width={140} height={40} sx={{ mx: 'auto', mb: 3, borderRadius: 2 }} />
        <Skeleton variant="text" sx={{ fontSize: '3rem', width: '80%', mx: 'auto', mb: 2, bgcolor: 'grey.900' }} />
        <Skeleton variant="text" sx={{ fontSize: '1.1rem', width: '70%', mx: 'auto', mb: 4, bgcolor: 'grey.900' }} />
        <Skeleton
          variant="rectangular"
          width={200}
          height={52}
          sx={{ mx: 'auto', mb: 3, borderRadius: '999px', bgcolor: 'primary.main' }}
        />
        <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={4}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width={120} height={24} sx={{ bgcolor: 'grey.900' }} />
        </Box>
      </Container>
    </Box>
  );

  // 🔁 Generic Section Skeleton
  const SectionSkeleton = () => (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Skeleton variant="text" sx={{ fontSize: '2rem', width: '50%', mb: 4, bgcolor: 'grey.900' }} />
      <Paper sx={{ p: 4, bgcolor: '#1e1e1e', borderRadius: 2 }}>
        <Skeleton variant="rectangular" height={200} sx={{ bgcolor: 'grey.900' }} />
      </Paper>
    </Container>
  );

  if (loading) {
    return (
      <>
        <HeroSkeleton />
        <SectionSkeleton /> {/* Features */}
        <SectionSkeleton /> {/* Pricing */}
        <SectionSkeleton /> {/* Testimonial */}
        <SectionSkeleton /> {/* Blog */}
        <SectionSkeleton /> {/* FAQ */}
      </>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: '#000',
          color: '#fff',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          pt: 10,
          py: 10,
          backgroundImage: `url('https://wallpapercave.com/wp/wp11604144.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Chip
            label="✨ AI Powered Task Management"
            sx={{
              backgroundColor: '#1e1e1e',
              color: '#ccc',
              mb: 3,
              fontSize: '0.8rem',
            }}
          />
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
          >
            Welcome to Taskify <br /> Your Ultimate Task Manager
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: '#bbb', mb: 4, fontSize: '1.1rem' }}
          >
            Organize your tasks, boost your productivity, and collaborate with ease. <br />
            Start managing your tasks today!
          </Typography>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            size="large"
            sx={{
              background: 'linear-gradient(to right, #4f46e5, #3b82f6)',
              color: '#fff',
              borderRadius: '999px',
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
              mb: 3,
              '&:hover': {
                background: 'linear-gradient(to right, #4338ca, #2563eb)',
              },
            }}
          >
            Get Started for Free
          </Button>
          <Box
            mt={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <AvatarGroup max={4}>
              <Avatar src="https://randomuser.me/api/portraits/women/1.jpg" />
              <Avatar src="https://randomuser.me/api/portraits/men/2.jpg" />
              <Avatar src="https://randomuser.me/api/portraits/women/3.jpg" />
              <Avatar src="https://randomuser.me/api/portraits/men/4.jpg" />
            </AvatarGroup>
            <Typography variant="body2" sx={{ color: '#ccc' }}>
              +300 Users Love Taskify
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Real Sections */}
      <Features />
      <Pricing />
      <Testimonial />
      <Blog />
      <FAQ />
    </>
  );
};

export default Home;
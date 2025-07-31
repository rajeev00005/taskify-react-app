import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const testimonials = [
  {
    name: 'Amit Sharma',
    role: 'Project Manager, Infosys',
    quote:
      'Task Manager transformed how our team collaborates. Simple, powerful, and effective!',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    name: 'Neha Roy',
    role: 'Team Lead, TCS',
    quote:
      'The productivity boost we experienced after using Task Manager is incredible!',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    name: 'Rahul Mehta',
    role: 'Freelancer',
    quote:
      'Managing client projects is so much easier now. Task Manager is my go-to tool!',
    avatar: 'https://i.pravatar.cc/150?img=8',
  },
  {
    name: 'Priya Singh',
    role: 'Software Engineer, Wipro',
    quote:
      'The intuitive design and powerful features of Task Manager make it a must-have for any team.',
    avatar: 'https://i.pravatar.cc/150?img=10',
  },
  {
    name: 'Vikram Patel',
    role: 'Team Lead, Wipro',
    quote: 'The productivity boost we experienced after using Task Manager is incredible!',
    avatar: 'https://i.pravatar.cc/150?img=5',
  }
];

const Testimonial = () => {
  return (
    <Box
      sx={{
        bgcolor: '#000',
        color: '#fff',
        minHeight: '100',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={10}>
          <Typography variant="h4" gutterBottom>
            What Our Users Say
          </Typography>
          <Typography variant="subtitle1">
            Real feedback from professionals who trust Task Manager daily.
          </Typography>
        </Box>

        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <Card
                sx={{
                  height: '50vh',
                  p: 3,
                  bgcolor: '#121212',
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 3,
                  textAlign: 'center',
                }}
              >
                <Avatar
                  src={t.avatar}
                  alt={t.name}
                  sx={{ width: 72, height: 72, mb: 2 }}
                />
                <Typography variant="h6" fontWeight={600}>
                  {t.name}
                </Typography>
                <Typography variant="caption" gutterBottom>
                  {t.role}
                </Typography>
                <CardContent>
                  <Typography variant="body2" fontStyle="italic">
                    “{t.quote}”
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default Testimonial;

import React from 'react';
import { Box, Typography, Container, Card, CardContent, Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const blogPosts = [
  {
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Boost Your Productivity with Task Manager',
    excerpt: 'Learn the best practices for team collaboration and how to assign, track, and deliver tasks on time.',
  },
  {
    img: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1350&q=80',
    title: '5 Tips for Effective Task Management',
    excerpt: 'Discover simple tricks to help prioritize and streamline your tasks.',
  },
  {
    img: 'https://media.licdn.com/dms/image/v2/D5612AQGR99GiMRoVEQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1704353631781?e=2147483647&v=beta&t=JzR7DeNjsOkXeuOTlZmqPiiPNK6dBECI53gB7qCiDic',
    title: 'How to Stay Organized with Task Manager',
    excerpt: 'Maximize efficiency using built-in features of Taskify Pro.',
  }
];

const Blog = () => {
  return (
    <Box sx={{
      bgcolor: '#000',
      color: '#fff',
      py: 6,
      minHeight: '100'
    }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          Latest Blog Posts
        </Typography>
        <Typography variant="subtitle1" align="center" mb={4}>
          Stay informed with productivity tips, team strategies, and app updates.
        </Typography>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 }
          }}
        >
          {blogPosts.map((post, index) => (
            <SwiperSlide key={index}>
              <Card
                sx={{
                  bgcolor: '#1e1e1e',
                  color: '#fff',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 3,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  }
                }}
              >
                <Box
                  component="img"
                  src={post.img}
                  alt={post.title}
                  sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ccc' }}>
                    {post.excerpt}
                  </Typography>
                  <Button sx={{ mt: 2 }} variant="contained" color="primary">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default Blog;

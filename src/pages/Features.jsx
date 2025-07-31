import React from 'react'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box
} from '@mui/material'
import InsightsIcon from '@mui/icons-material/Insights'
import ChecklistIcon from '@mui/icons-material/Checklist'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import {motion} from 'framer-motion'

// Feature data
const features = [
  {
    title: 'Personal Dashboard',
    description: 'Get a clear overview of tasks, deadlines, and priorities.',
    icon: <InsightsIcon fontSize="large" color="primary" />
  },
  {
    title: 'Task Scheduling',
    description: 'Easily set due dates and reminders for all your tasks.',
    icon: <ChecklistIcon fontSize="large" color="primary" />
  },
  {
    title: 'Team Collaboration',
    description: 'Assign tasks, comment, and collaborate with your team.',
    icon: <PeopleAltIcon fontSize="large" color="primary" />
  },
  {
    title: 'Real-time Notifications',
    description: 'Stay updated with task progress and instant alerts.',
    icon: <NotificationsActiveIcon fontSize="large" color="primary" />
  }
]

// Framer motion variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

const titleVariant = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

const Features = () => {
  return (
    <Box
      sx={{
        bgcolor: '#000',
        color: '#fff',
        py: 5,
        px: 2
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={titleVariant}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Key Features of Task Manager
          </Typography>
          <Typography variant="subtitle1" align="center" mb={5}>
            Explore the powerful features that make Task Manager your go-to solution for productivity.
          </Typography>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Grid container spacing={6} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <motion.div variants={cardVariants} whileHover={{ scale: 1.04 }}>
                  <Card
                    sx={{
                      p: 4,
                      height: '100%',
                      textAlign: 'center',
                      borderRadius: 3,
                      background: 'rgba(30,30,30,0.75)',
                      color: '#fff',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                      backdropFilter: 'blur(6px)',
                      transition: '0.3s ease-in-out'
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2,
                          '& svg': {
                            transition: 'transform 0.3s',
                            ':hover': {
                              transform: 'scale(1.2) rotate(2deg)'
                            }
                          }
                        }}
                      >
                        {feature.icon}
                        <Typography variant="h6" sx={{ ml: 2 }}>
                          {feature.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#ccc' }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  )
}

export default Features

import React from 'react'
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Container,
  Grid
} from '@mui/material'

const pricingPlans = [
  {
    title: 'Free',
    price: '₹0',
    features: ['1 Project', 'Basic Support', 'Limited Features'],
    buttonText: 'Start for Free',
    variant: 'outlined'
  },
  {
    title: 'Pro',
    price: '₹499/month',
    features: ['Unlimited Projects', 'Priority Support', 'Collaboration Tools'],
    buttonText: 'Upgrade to Pro',
    variant: 'contained'
  },
  {
    title: 'Enterprise',
    price: 'Contact Us',
    features: ['Custom Solutions', 'Dedicated Manager', 'Enterprise Support'],
    buttonText: 'Contact Sales',
    variant: 'outlined'
  }
]

const Pricing = () => {
  return (
    <Box sx={{
      bgcolor: '#000',
        color: '#fff',
        minHeight: '100',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
    }}>
    <Container sx={{ py: 1 }}>
      <Typography variant="h4" align="center" mb={4} gutterBottom >
        Get Started with Our <br /> simple Pricing 
      </Typography>
      <br />
      <Grid container spacing={10} justifyContent="center">
        {pricingPlans.map((plan, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card elevation={3} sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: '#1e1e1e', color: '#fff', transition: 'transform 0.3s ease, box-shadow 0.3s ease', '&:hover': { transform: 'scale(1.05)', boxShadow: 6 } }}>
              <CardContent>
                <Typography variant="h4" align="center" gutterBottom >
                  {plan.title}
                </Typography>
                <Typography variant="h3" align="center" gutterBottom>
                  {plan.price}
                </Typography>
                <Box>
                  {plan.features.map((feature, idx) => (
                    <Typography
                      key={idx}
                      variant="body2"
                      align="center"
                      sx={{ py: 1 , fontSize: '0.9rem' , textAlign: 'center' ,px: 10}}
                    >
                      • {feature}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button variant={plan.variant} color="primary">
                  {plan.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </Box>
  )
}

export default Pricing

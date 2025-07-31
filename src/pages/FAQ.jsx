import React from 'react'
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const faqs = [
  {
    question: 'Is Task Manager free to use?',
    answer: 'Yes! We offer a free plan with essential features. You can upgrade anytime for advanced tools.'
  },
  {
    question: 'Can I collaborate with team members?',
    answer: 'Absolutely. Our Pro and Enterprise plans are built for real-time team collaboration.'
  },
  {
    question: 'Do you offer customer support?',
    answer: 'Yes, we offer email and chat support on all paid plans. Priority support is available on Pro and Enterprise.'
  },
  {
    question: 'How secure is my data?',
    answer: 'We use industry-standard encryption and security practices to keep your data safe and private.'
  }
]

const FAQ = () => {
  return (
    <Box sx={{ bgcolor: '#000',
        color: '#fff',
        minHeight: '100',
        display: 'flex',
        pb: 6,}}>
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Frequently Asked Questions
      </Typography>
      <Typography variant="subtitle1" align="center" mb={10}>
        Here are some common questions and answers about Task Manager.
      </Typography>

      {faqs.map((faq, index) => (
        <Accordion key={index} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-content-${index}`} id={`faq-header-${index}`}>
            <Typography variant="subtitle1" fontWeight={600}>
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
    </Box>
  )
}

export default FAQ

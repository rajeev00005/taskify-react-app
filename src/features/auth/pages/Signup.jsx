import { useState } from 'react'
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      setUser(userCredential.user)
      console.log("✅ User signed up successfully")
      navigate('/dashboard')
    } catch (err) {
      console.error("Signup Error:", err)
      setError(err.message)
    }
  }

  return (
    <>
    <Box sx={{
      bgcolor: '#000',
      minHeight: '100',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 2,
      color: '#fff'
    } }>
    <Container maxWidth="sm" sx={{ mt: { xs: 6, sm: 10 } }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pb: 4,
          mb: 10,
          backgroundColor: '#121212',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3, color: '#fff' }}>
          Signup
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 2, color: '#bbb' }}>
          Create your account to start using Task Manager.
        </Typography>

        <Box component="form" onSubmit={handleSignup} sx={{ width: '100%' }}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ bgcolor: '#fff', borderRadius: 1 }}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ bgcolor: '#fff', borderRadius: 1 }}
          />

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
          >
            Signup
          </Button>
        </Box>
      </Paper>
    </Container>
    </Box>
    </>
  )
}

export default Signup

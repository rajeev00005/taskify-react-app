import { useState , useEffect} from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

// 🔁 Loading Component (Shown After Login Submit)
const LoadingScreen = () => (
  <Box
    sx={{
      bgcolor: '#000',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      px: 2,
    }}
  >
    <Box textAlign="center">
      <CircularProgress color="primary" size={60} thickness={4} />
      <Typography variant="h6" sx={{ mt: 3, color: '#fff' }}>
        Logging you in...
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Preparing your dashboard
      </Typography>
    </Box>
  </Box>
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // ← Controls form submit
  const [showLoading, setShowLoading] = useState(false);   // ← Controls full loading page
  const navigate = useNavigate();
  const { user } = useAuth();

  // If already logged in, redirect
  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    // Show full loading page immediately
    setShowLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Success → will be caught by AuthContext → redirect
      navigate('/dashboard', { replace: true });
    } catch (err) {
      // Show error, hide loading
      setError(err);
      setShowLoading(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // 🔹 Show full loading screen after form submit
  if (showLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box
      sx={{
        bgcolor: '#000',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        px: 2,
        py: 12,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: '#121212',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ color: '#fff' }}>
            Login to Taskify
          </Typography>

          <Typography variant="subtitle1" align="center" sx={{ mb: 3, color: '#bbb' }}>
            Enter your credentials to access your dashboard
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ bgcolor: '#fff', borderRadius: 1, mb: 2 }}
            />

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ bgcolor: '#fff', borderRadius: 1, mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error.message}
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={isSubmitting}
              sx={{ mt: 3, py: 1.5, fontWeight: 'bold', fontSize: '1rem' }}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
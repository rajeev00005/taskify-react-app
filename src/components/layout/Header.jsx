import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Blog', path: '/blog' },
    { label: 'Testimonials', path: '/testimonial' },
    { label: 'FAQ', path: '/faq' },
    ...(user ? [{ label: 'Dashboard', path: '/dashboard' }] : []),
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box sx={{ width: 250 }} onClick={toggleDrawer(false)}>
      <List>
        {navLinks.map((link) => (
          <ListItem
            button
            key={link.path}
            component={Link}
            to={link.path}
            selected={location.pathname === link.path}
            sx={{
              color: '#ccc',
              '&.Mui-selected': {
                color: '#fff',
                fontWeight: 'bold',
                bgcolor: 'transparent',
              },
              '&.Mui-selected:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.08)',
              },
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                transition: 'all 0.3s ease',
              },
            }}
          >
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
        <ListItem sx={{ flexDirection: 'column', gap: 1 }}>
          {user ? (
            <Button
              onClick={handleLogout}
              variant="outlined"
              fullWidth
              sx={{
                textTransform: 'none',
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.3)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: '#fff',
                  transition: 'all 0.3s ease',
                },
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                fullWidth
                sx={{
                  textTransform: 'none',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 1,
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: '#fff',
                  color: '#000',
                  textTransform: 'none',
                  borderRadius: '999px',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                    transform: 'scale(1.02)',
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#000',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Box component={Link} to="/" sx={{ textDecoration: 'none', color: '#fff' }}>
          <Typography variant="h6" fontWeight="bold">
            Taskify
          </Typography>
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box display="flex" alignItems="center" gap={1}>
            {navLinks.map((link) => (
              <Button
                key={link.path}
                component={Link}
                to={link.path}
                sx={{
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: location.pathname === link.path ? 'bold' : 500,
                  position: 'relative',
                  px: 1.5,
                  '&:hover': {
                    color: '#00d8ff', // Nice hover color (you can change)
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                  },
                  // Optional: Underline animation on hover
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: 0,
                    height: 2,
                    bottom: 0,
                    left: '50%',
                    backgroundColor: '#00d8ff',
                    transition: 'all 0.3s ease',
                    transform: 'translateX(-50%)',
                  },
                  '&:hover::after': {
                    width: '80%',
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>
        )}

        {/* Right Section: Auth Buttons or Menu Icon */}
        <Box display="flex" alignItems="center">
          {isMobile ? (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'scale(1.1)',
                  transition: 'all 0.2s ease',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            user ? (
              <Button
                onClick={handleLogout}
                variant="outlined"
                sx={{
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,0.3)',
                  borderRadius: '999px',
                  textTransform: 'none',
                  px: 2,
                  '&:hover': {
                    borderColor: '#fff',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'scale(1.05)',
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    color: '#fff',
                    textTransform: 'none',
                    mr: 1,
                    '&:hover': {
                      color: '#00d8ff',
                      textDecoration: 'underline',
                      transition: 'all 0.3s ease',
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  sx={{
                    backgroundColor: '#fff',
                    color: '#000',
                    borderRadius: '999px',
                    px: 3,
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                      transform: 'scale(1.05)',
                      boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
                      transition: 'all 0.3s ease',
                    },
                  }}
                >
                  Sign Up
                </Button>
              </>
            )
          )}
        </Box>

        {/* Mobile Drawer */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawerContent}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
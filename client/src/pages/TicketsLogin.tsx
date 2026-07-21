import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Fade,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const TicketsLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, isTicketsAuthenticated, loading: authLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (authLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background:
            'linear-gradient(180deg, #6B0000 0%, #8B0000 50%, #000000 100%)',
        }}
      >
        <CircularProgress sx={{ color: '#E62B1F' }} />
      </Box>
    );
  }

  if (isTicketsAuthenticated) {
    const from =
      (location.state as any)?.from?.pathname || '/tickets-management';
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(username, password, 'ticketsAdmin');
      if (!success) {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, #6B0000 0%, #8B0000 50%, #000000 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(circle at 20% 30%, rgba(230, 43, 31, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in timeout={800}>
          <Card
            elevation={0}
            sx={{
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              borderRadius: 4,
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(230, 43, 31, 0.2)',
              overflow: 'hidden',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: '#E62B1F',
              },
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    color: '#1a1a1a',
                    mb: 1,
                    fontSize: { xs: '2rem', sm: '2.5rem' },
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                  }}
                >
                  Tickets Login
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(0, 0, 0, 0.7)',
                    mt: 1,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                  }}
                >
                  Access the TEDx Shmeisani tickets management system
                </Typography>
              </Box>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  '& .MuiTextField-root': {
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(230, 43, 31, 0.15)',
                        '& fieldset': {
                          borderColor: 'rgba(230, 43, 31, 0.4)',
                        },
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        boxShadow: '0 4px 20px rgba(230, 43, 31, 0.2)',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderWidth: 2,
                          borderColor: '#E62B1F',
                        },
                      },
                    },
                    '& .MuiInputLabel-root': {
                      fontWeight: 500,
                      color: 'rgba(0, 0, 0, 0.7)',
                      '&.Mui-focused': {
                        color: '#E62B1F',
                      },
                    },
                  },
                }}
              >
                <TextField
                  fullWidth
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  margin="normal"
                  autoComplete="username"
                />

                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  margin="normal"
                  autoComplete="current-password"
                />

                {error && (
                  <Alert
                    severity="error"
                    sx={{
                      mt: 2,
                      borderRadius: 2,
                      '& .MuiAlert-icon': {
                        color: '#E62B1F',
                      },
                    }}
                  >
                    {error}
                  </Alert>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    background: loading ? '#666666' : '#E62B1F',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    boxShadow: loading
                      ? 'none'
                      : '0 4px 15px rgba(230, 43, 31, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: loading ? '#666666' : '#c5241a',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(230, 43, 31, 0.5)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    },
                  }}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default TicketsLogin;

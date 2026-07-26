import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Fade,
  TextField,
  Typography,
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useCheckinAuth } from '../contexts/CheckinAuthContext';

const CheckInLoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { isCheckinAuthenticated, loading, login } = useCheckinAuth();
  const navigate = useNavigate();

  // Auto-clear error after 5 s
  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(''), 5000);
    return () => clearTimeout(t);
  }, [error]);

  // Redirect if already authenticated
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #1a0000 0%, #000 100%)',
        }}
      >
        <CircularProgress sx={{ color: '#E62B1F' }} />
      </Box>
    );
  }

  if (isCheckinAuthenticated) {
    return <Navigate to="/check-in" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const success = await login(username.trim(), password);
      if (success) {
        navigate('/check-in', { replace: true });
      } else {
        setError('Invalid username or password.');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #1a0000 0%, #3b0000 40%, #000000 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        px: 2,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(circle at 30% 40%, rgba(230, 43, 31, 0.12) 0%, transparent 60%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in timeout={700}>
          <Box>
            {/* Logo / header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'rgba(230,43,31,0.15)',
                  border: '2px solid rgba(230,43,31,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <QrCodeScannerIcon sx={{ color: '#E62B1F', fontSize: '2rem' }} />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: '#fff',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontSize: { xs: '1.5rem', sm: '1.9rem' },
                }}
              >
                TEDx Check-In
              </Typography>
              <Typography
                sx={{ color: 'rgba(255,255,255,0.45)', mt: 0.5, fontSize: '0.85rem' }}
              >
                Staff Login
              </Typography>
            </Box>

            {/* Card */}
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                background: 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
                border: '1px solid rgba(230,43,31,0.15)',
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
              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        boxShadow: '0 2px 10px rgba(230,43,31,0.12)',
                        '& fieldset': { borderColor: 'rgba(230,43,31,0.5)' },
                      },
                      '&.Mui-focused': {
                        boxShadow: '0 3px 14px rgba(230,43,31,0.18)',
                        '& fieldset': { borderColor: '#E62B1F', borderWidth: 2 },
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#E62B1F' },
                  }}
                >
                  <TextField
                    id="checkin-username"
                    fullWidth
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    margin="normal"
                    autoComplete="username"
                    autoFocus
                    disabled={submitting}
                  />

                  <TextField
                    id="checkin-password"
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    margin="normal"
                    autoComplete="current-password"
                    disabled={submitting}
                  />

                  {error && (
                    <Alert
                      severity="error"
                      sx={{ mt: 2, borderRadius: 2 }}
                    >
                      {error}
                    </Alert>
                  )}

                  <Button
                    id="checkin-login-btn"
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={submitting}
                    sx={{
                      mt: 3,
                      py: 1.5,
                      fontWeight: 700,
                      fontSize: '1rem',
                      borderRadius: 2,
                      background: submitting ? '#888' : '#E62B1F',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      boxShadow: submitting
                        ? 'none'
                        : '0 4px 16px rgba(230,43,31,0.4)',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        background: '#c5241a',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 6px 20px rgba(230,43,31,0.5)',
                      },
                      '&:active': { transform: 'translateY(0)' },
                      '&.Mui-disabled': { background: '#ccc', color: '#888' },
                    }}
                  >
                    {submitting ? (
                      <CircularProgress size={22} sx={{ color: '#fff' }} />
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <Typography
              sx={{
                textAlign: 'center',
                color: 'rgba(255,255,255,0.25)',
                fontSize: '0.75rem',
                mt: 3,
              }}
            >
              Check-in staff access only · TEDx Shmeisani
            </Typography>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default CheckInLoginPage;

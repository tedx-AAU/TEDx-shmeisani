
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Fade,
  Stack,
  Typography,
  Alert,
  Snackbar,
  IconButton,
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PersonIcon from '@mui/icons-material/Person';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useAuth } from '../contexts/AuthContext';
import { apiConfig } from '../config/api';

// ── types ──────────────────────────────────────────────────────────────
interface RegistrationInfo {
  customerNumber: number;
  ticketType: 'main' | 'full';
  numberOfTickets: number;
  status: string;
}

interface AttendeeInfo {
  name: string;
  ticketCode: string;
  isCheckedIn: boolean;
  university: string;
  gender: string;
  age: string | number;
}

type ScanStatus = 'idle' | 'scanning' | 'loading' | 'valid' | 'already_checked' | 'invalid';

// ── helpers ─────────────────────────────────────────────────────────────
const TICKET_TYPE_LABELS: Record<string, string> = {
  main: 'Main TEDx Ticket',
  full: 'Full Path Ticket',
};

// ── main component ──────────────────────────────────────────────────────
const CheckInPage: React.FC = () => {
  const { isTicketsAuthenticated, loading: authLoading } = useAuth();

  const [scanStatus, setScanStatus] = useState<ScanStatus>('idle');
  const [registration, setRegistration] = useState<RegistrationInfo | null>(null);
  const [attendee, setAttendee] = useState<AttendeeInfo | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [isScannerReady, setIsScannerReady] = useState(false);

  const scannerRef = useRef<any>(null);
  const scannerDivId = 'qr-reader-checkin';
  const lastScannedCode = useRef<string>('');

  const getToken = () => localStorage.getItem('ticketsToken') || '';

  // ── Lookup ticket via GET ────────────────────────────────────────────
  const lookupTicket = useCallback(async (ticketCode: string) => {
    if (ticketCode === lastScannedCode.current) return; // debounce duplicates
    lastScannedCode.current = ticketCode;
    setScanStatus('loading');
    setRegistration(null);
    setAttendee(null);
    setErrorMessage('');

    try {
      const token = getToken();
      const res = await fetch(apiConfig.endpoints.checkin.lookup(ticketCode), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        setScanStatus('invalid');
        setErrorMessage(data.error || 'Ticket not found.');
        return;
      }

      setRegistration(data.registration);
      const att: AttendeeInfo = data.attendee;
      setAttendee(att);
      setScanStatus(att.isCheckedIn ? 'already_checked' : 'valid');
    } catch {
      setScanStatus('invalid');
      setErrorMessage('Network error. Could not validate ticket.');
    }
  }, []);

  // ── QR Scanner bootstrap ─────────────────────────────────────────────
  useEffect(() => {
    if (!isTicketsAuthenticated) return;

    let html5QrCode: any = null;

    const startScanner = async () => {
      try {
        // Dynamically import to avoid SSR issues
        const { Html5Qrcode } = await import('html5-qrcode');
        html5QrCode = new Html5Qrcode(scannerDivId);
        scannerRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: 260, height: 260 } },
          (decodedText: string) => {
            const code = decodedText.trim();
            lookupTicket(code);
          },
          (_errorMessage: string) => {
            // scanning errors are non-critical, ignore
          }
        );
        setIsScannerReady(true);
      } catch (err) {
        console.error('QR scanner failed to start:', err);
        setIsScannerReady(false);
      }
    };

    startScanner();

    return () => {
      if (html5QrCode) {
        html5QrCode
          .stop()
          .then(() => html5QrCode.clear())
          .catch(() => {});
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTicketsAuthenticated]);

  // ── Confirm check-in via PATCH ────────────────────────────────────────
  const handleConfirmCheckIn = async () => {
    if (!attendee) return;
    setConfirmLoading(true);

    try {
      const token = getToken();
      const res = await fetch(apiConfig.endpoints.checkin.confirm(attendee.ticketCode), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (data.success) {
        setAttendee((prev) => prev ? { ...prev, isCheckedIn: true } : prev);
        setScanStatus('already_checked');
        setSnackbar({ open: true, message: `✔ ${attendee.name} has been checked in!`, severity: 'success' });
      } else if (data.alreadyCheckedIn) {
        setScanStatus('already_checked');
        setSnackbar({ open: true, message: 'This attendee was already checked in.', severity: 'error' });
      } else {
        setSnackbar({ open: true, message: data.error || 'Check-in failed.', severity: 'error' });
      }
    } catch {
      setSnackbar({ open: true, message: 'Network error during check-in.', severity: 'error' });
    } finally {
      setConfirmLoading(false);
    }
  };

  // ── Reset scanner for next scan ───────────────────────────────────────
  const handleReset = () => {
    lastScannedCode.current = '';
    setRegistration(null);
    setAttendee(null);
    setErrorMessage('');
    setScanStatus('scanning');
    // Re-enable scanning
    setTimeout(() => setScanStatus('idle'), 100);
  };

  // ── Guard: auth ────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(180deg, #6B0000 0%, #000 100%)' }}>
        <CircularProgress sx={{ color: '#E62B1F' }} />
      </Box>
    );
  }

  if (!isTicketsAuthenticated) {
    return <Navigate to="/tickets-login" replace />;
  }

  // ── Status badge ──────────────────────────────────────────────────────
  const renderStatusBadge = () => {
    if (scanStatus === 'valid') {
      return (
        <Chip
          icon={<CheckCircleIcon />}
          label="VALID TICKET"
          sx={{ backgroundColor: '#4caf50', color: '#fff', fontWeight: 700, fontSize: '0.95rem', px: 2, py: 2.5, borderRadius: '50px' }}
        />
      );
    }
    if (scanStatus === 'already_checked') {
      return (
        <Chip
          icon={<WarningAmberIcon />}
          label="ALREADY CHECKED IN"
          sx={{ backgroundColor: '#f44336', color: '#fff', fontWeight: 700, fontSize: '0.95rem', px: 2, py: 2.5, borderRadius: '50px' }}
        />
      );
    }
    if (scanStatus === 'invalid') {
      return (
        <Chip
          icon={<CancelIcon />}
          label="INVALID TICKET"
          sx={{ backgroundColor: '#9e9e9e', color: '#fff', fontWeight: 700, fontSize: '0.95rem', px: 2, py: 2.5, borderRadius: '50px' }}
        />
      );
    }
    return null;
  };

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #1a0000 0%, #3b0000 40%, #000000 100%)',
        py: 4,
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        {/* Header */}
        <Fade in timeout={500}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 1 }}>
              <QrCodeScannerIcon sx={{ color: '#E62B1F', fontSize: '2.2rem' }} />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontSize: { xs: '1.6rem', sm: '2rem' },
                }}
              >
                TEDx Check-In
              </Typography>
            </Box>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
              Scan attendee QR code to validate entry
            </Typography>
          </Box>
        </Fade>

        {/* QR Scanner Box */}
        <Fade in timeout={700}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              border: '1px solid rgba(230,43,31,0.3)',
              background: 'rgba(20,20,20,0.9)',
              backdropFilter: 'blur(20px)',
              mb: 3,
            }}
          >
            <CardContent sx={{ p: 0 }}>
              {/* Scanner header bar */}
              <Box sx={{ background: '#E62B1F', px: 3, py: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <QrCodeScannerIcon sx={{ color: '#fff', fontSize: '1.3rem' }} />
                <Typography sx={{ color: '#fff', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
                  QR Scanner
                </Typography>
                {isScannerReady && (
                  <Chip label="LIVE" size="small" sx={{ ml: 'auto', background: 'rgba(255,255,255,0.25)', color: '#fff', fontSize: '0.7rem', height: 20, fontWeight: 700 }} />
                )}
              </Box>

              {/* The actual scanner div – html5-qrcode mounts here */}
              <Box
                id={scannerDivId}
                sx={{
                  width: '100%',
                  '& video': { borderRadius: 0 },
                  '& #qr-shaded-region': { borderRadius: 0 },
                }}
              />

              {!isScannerReady && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, gap: 2 }}>
                  <CircularProgress sx={{ color: '#E62B1F' }} />
                  <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                    Initialising camera…
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Fade>

        {/* Loading state after scan */}
        {scanStatus === 'loading' && (
          <Fade in>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, py: 3 }}>
              <CircularProgress size={24} sx={{ color: '#E62B1F' }} />
              <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>Validating ticket…</Typography>
            </Box>
          </Fade>
        )}

        {/* Result Card */}
        {(scanStatus === 'valid' || scanStatus === 'already_checked' || scanStatus === 'invalid') && (
          <Fade in timeout={400}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                border: scanStatus === 'valid'
                  ? '1.5px solid rgba(76,175,80,0.5)'
                  : scanStatus === 'already_checked'
                  ? '1.5px solid rgba(244,67,54,0.5)'
                  : '1.5px solid rgba(158,158,158,0.4)',
                background: 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Top color bar */}
              <Box
                sx={{
                  height: 5,
                  background: scanStatus === 'valid' ? '#4caf50' : scanStatus === 'already_checked' ? '#f44336' : '#9e9e9e',
                }}
              />

              <CardContent sx={{ p: 3 }}>
                {/* Status badge */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2.5 }}>
                  {renderStatusBadge()}
                </Box>

                {/* Invalid message */}
                {scanStatus === 'invalid' && (
                  <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                    {errorMessage || 'This QR code is not recognised.'}
                  </Alert>
                )}

                {/* Attendee + Registration info */}
                {attendee && registration && (
                  <Stack spacing={1.5}>
                    {/* Attendee Name */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <PersonIcon sx={{ color: '#E62B1F', fontSize: '1.3rem', flexShrink: 0 }} />
                      <Box>
                        <Typography sx={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
                          Visitor Name
                        </Typography>
                        <Typography sx={{ fontWeight: 700, color: '#1a1a1a', fontSize: '1.05rem' }}>
                          {attendee.name}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider />

                    {/* Grid of details */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                      <Box>
                        <Typography sx={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
                          Ticket Type
                        </Typography>
                        <Typography sx={{ fontWeight: 600, color: '#1a1a1a', fontSize: '0.9rem' }}>
                          {TICKET_TYPE_LABELS[registration.ticketType] || registration.ticketType}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography sx={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
                          Customer #
                        </Typography>
                        <Typography sx={{ fontWeight: 600, color: '#1a1a1a', fontSize: '0.9rem' }}>
                          #{registration.customerNumber}
                        </Typography>
                      </Box>

                      <Box sx={{ gridColumn: '1 / -1' }}>
                        <Typography sx={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
                          Ticket Code
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ConfirmationNumberIcon sx={{ color: '#E62B1F', fontSize: '1rem' }} />
                          <Typography sx={{ fontWeight: 600, color: '#1a1a1a', fontSize: '0.9rem', fontFamily: 'monospace', letterSpacing: '0.5px' }}>
                            {attendee.ticketCode}
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <Typography sx={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
                          Reg. Status
                        </Typography>
                        <Chip
                          label={registration.status}
                          size="small"
                          color={registration.status === 'Accepted' ? 'success' : registration.status === 'Rejected' ? 'error' : 'default'}
                          sx={{ fontWeight: 700, fontSize: '0.75rem' }}
                        />
                      </Box>

                      <Box>
                        <Typography sx={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
                          Check-In Status
                        </Typography>
                        <Chip
                          label={attendee.isCheckedIn ? 'Checked In' : 'Not Checked In'}
                          size="small"
                          icon={attendee.isCheckedIn ? <CheckCircleIcon /> : undefined}
                          sx={{
                            background: attendee.isCheckedIn ? '#4caf50' : '#e0e0e0',
                            color: attendee.isCheckedIn ? '#fff' : '#555',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                          }}
                        />
                      </Box>
                    </Box>

                    <Divider />

                    {/* Action buttons */}
                    <Stack direction="row" spacing={1.5} sx={{ mt: 0.5 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={confirmLoading ? <CircularProgress size={16} sx={{ color: '#fff' }} /> : <CheckCircleIcon />}
                        onClick={handleConfirmCheckIn}
                        disabled={scanStatus !== 'valid' || confirmLoading}
                        sx={{
                          py: 1.4,
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          borderRadius: 2,
                          background: scanStatus === 'valid' ? '#4caf50' : '#ccc',
                          textTransform: 'uppercase',
                          letterSpacing: '0.8px',
                          boxShadow: scanStatus === 'valid' ? '0 4px 15px rgba(76,175,80,0.4)' : 'none',
                          '&:hover': { background: '#388e3c' },
                          '&.Mui-disabled': { background: '#e0e0e0', color: '#aaa' },
                        }}
                      >
                        {confirmLoading ? 'Checking In…' : 'Confirm Check-In'}
                      </Button>

                      <IconButton
                        onClick={handleReset}
                        title="Scan another ticket"
                        sx={{
                          border: '1.5px solid rgba(230,43,31,0.4)',
                          borderRadius: 2,
                          color: '#E62B1F',
                          '&:hover': { background: 'rgba(230,43,31,0.08)' },
                          px: 1.5,
                        }}
                      >
                        <RestartAltIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                )}

                {/* If invalid, just a reset button */}
                {scanStatus === 'invalid' && (
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<RestartAltIcon />}
                    onClick={handleReset}
                    sx={{
                      mt: 1,
                      py: 1.4,
                      fontWeight: 700,
                      borderRadius: 2,
                      borderColor: '#E62B1F',
                      color: '#E62B1F',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                      '&:hover': { borderColor: '#c5241a', background: 'rgba(230,43,31,0.05)' },
                    }}
                  >
                    Scan Another Ticket
                  </Button>
                )}
              </CardContent>
            </Card>
          </Fade>
        )}
      </Container>

      {/* Success / error snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          sx={{ width: '100%', borderRadius: 2, fontWeight: 600 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CheckInPage;

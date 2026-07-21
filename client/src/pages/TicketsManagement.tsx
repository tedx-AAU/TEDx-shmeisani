import {
  Add as AddIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  FileDownload as FileDownloadIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  Grid,
  IconButton,
  Pagination,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import BookingForm from '../components/BookingForm';
import { apiConfig } from '../config/api';
import { useAuth } from '../contexts/AuthContext';
import { apiRequest } from '../services/api';

interface Registration {
  _id: string;
  customerNumber: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  isStudent: string;
  university?: string;
  gender: string;
  age: string;
  heard: string;
  about: string;
  numberOfTickets: number;
  status: 'Pending' | 'Accepted' | 'Rejected';
  createdAt?: string;
  updatedAt?: string;
}

const TicketsManagement: React.FC = () => {
  const { isTicketsAuthenticated, userType } = useAuth();
  const navigate = useNavigate();
  const hasNavigatedRef = useRef(false);
  const hasFetchedInitialDataRef = useRef(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info',
  });
  const [registrationForm, setRegistrationForm] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [totalAccepted, setTotalAccepted] = useState(0);
  const [availableTickets, setAvailableTickets] = useState(0);

  const fetchAvailableTickets = useCallback(async () => {
    try {
      const response = await apiRequest(
        apiConfig.endpoints.registration.ticketsAvailable,
        'GET'
      );

      if (response?.success) {
        setAvailableTickets(response?.numberOfTickets || 0);
      }
    } catch (error) {
      console.error('Error fetching available tickets:', error);
    }
  }, []);

  const fetchTotalAccepted = useCallback(async () => {
    try {
      const response = await apiRequest(
        apiConfig.endpoints.registration.registrationsAcceptedCount,
        'GET'
      );
      setTotalAccepted(response?.totalAccepted || 0);
    } catch (error) {
      console.error('Error fetching total accepted registrations:', error);
    }
  }, []);

  const fetchRegistrations = useCallback(
    async (
      currentPage: number = 1,
      searchTerm: string = '',
      statusFilter: string = ''
    ) => {
      setLoading(true);

      try {
        const token = localStorage.getItem('ticketsToken');
        const response = await apiRequest(
          `${apiConfig.endpoints.registration.registrations}?page=${currentPage}&limit=10&search=${searchTerm}&status=${statusFilter}`,
          'GET',
          null,
          token || undefined
        );
        console.log("Registrations API:", response);
        setRegistrations(response?.data || []);
        setTotalPages(response?.totalPages || 1);
      } catch (error) {
        console.error('Error fetching registrations:', error);
        setRegistrations([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleExportToExcel = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('ticketsToken');

      const response = await apiRequest(
        `${apiConfig.endpoints.registration.registrationsExport}?status=${filter}`,
        'GET',
        null,
        token || undefined
      );

      if (response?.data?.length === 0) {
        setSnackbar({
          open: true,
          message: 'No data available to export.',
          severity: 'warning',
        });
        return;
      }

      const dataToExport = response?.data?.map?.(
        (registration: Registration) => ({
          'Customer Number': registration?.customerNumber,
          'Full Name': registration?.fullName,
          Email: registration?.email,
          'Phone Number': registration?.phoneNumber,
          'Number of Tickets': registration?.numberOfTickets,
          Status: registration?.status,
        })
      );

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

      XLSX.writeFile(
        workbook,
        filter === ''
          ? 'All_Registrations.xlsx'
          : `All_${filter}_Registrations.xlsx`
      );

      setSnackbar({
        open: true,
        message: 'Data exported successfully!',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error exporting data:', error);
      setSnackbar({
        open: true,
        message: 'Failed to export data.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    fetchRegistrations(value, search, filter);
  };

  const handleAccept = async (id: string) => {
    setLoading(true);
    const token = localStorage.getItem('ticketsToken');

    try {
      await apiRequest(
        `${apiConfig.endpoints.registration.registrationsById.replace(
          ':id',
          id
        )}`,
        'PATCH',
        { status: 'Accepted' },
        token || undefined
      );

      fetchRegistrations(page, search, filter);
      fetchTotalAccepted();
      fetchAvailableTickets();
      setSnackbar({
        open: true,
        message: 'Registration accepted successfully!',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error accepting registration:', error);
      setSnackbar({
        open: true,
        message: 'Failed to accept registration.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    setLoading(true);
    const token = localStorage.getItem('ticketsToken');

    try {
      await apiRequest(
        `${apiConfig.endpoints.registration.registrationsById.replace(
          ':id',
          id
        )}`,
        'PATCH',
        { status: 'Rejected' },
        token || undefined
      );

      fetchRegistrations(page, search, filter);
      fetchAvailableTickets();
      setSnackbar({
        open: true,
        message: 'Registration rejected successfully!',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error rejecting registration:', error);
      setSnackbar({
        open: true,
        message: 'Failed to reject registration.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTicket = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('ticketsToken');

      const response = await apiRequest(
        apiConfig.endpoints.registration.ticketsAdd,
        'PATCH',
        {
          numberOfTickets: 1,
        },
        token || undefined
      );

      if (response?.success) {
        fetchAvailableTickets();
        setSnackbar({
          open: true,
          message: 'Ticket added successfully!',
          severity: 'success',
        });
      }
    } catch (error) {
      console.error('Error adding ticket:', error);
      setSnackbar({
        open: true,
        message: 'Failed to add ticket.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (registration: Registration) => {
    setSelectedRegistration(registration);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'success';
      case 'Rejected':
        return 'error';
      default:
        return 'warning';
    }
  };

  // Auth check and initial data fetch
  useEffect(() => {
    if (!isTicketsAuthenticated || userType !== 'ticketsAdmin') {
      if (!hasNavigatedRef.current) {
        hasNavigatedRef.current = true;
        navigate('/tickets-login');
      }
      return;
    }

    hasNavigatedRef.current = false;

    if (!hasFetchedInitialDataRef.current) {
      hasFetchedInitialDataRef.current = true;
      fetchRegistrations(1, search, filter);
      fetchTotalAccepted();
      fetchAvailableTickets();
    }
  }, [
    isTicketsAuthenticated,
    userType,
    navigate,
    fetchRegistrations,
    fetchTotalAccepted,
    fetchAvailableTickets,
    search,
    filter,
  ]);

  useEffect(() => {
    if (
      isTicketsAuthenticated &&
      userType === 'ticketsAdmin' &&
      hasFetchedInitialDataRef.current
    ) {
      fetchRegistrations(page, search, filter);
    }
   
  }, [page]);

  if (!isTicketsAuthenticated || userType !== 'ticketsAdmin') {
    return null;
  }

  return (
    <>
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <CircularProgress sx={{ color: '#E62B1F' }} />
        </Box>
      )}

      <Box
        sx={{
          minHeight: '100vh',
          background:
            'linear-gradient(180deg, #6B0000 0%, #8B0000 50%, #000000 100%)',
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
              'radial-gradient(circle at 20% 30%, rgba(230, 43, 31, 0.1) 0%, transparent 50%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{ py: 4, position: 'relative', zIndex: 1 }}
        >
          <Fade in timeout={600}>
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
                mb: 3,
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
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    color: '#1a1a1a',
                    fontSize: { xs: '1.75rem', sm: '2rem' },
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  Tickets Management
                </Typography>
              </CardContent>
            </Card>
          </Fade>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Fade in timeout={700}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.98)',
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(230, 43, 31, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 30px rgba(230, 43, 31, 0.2)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{
                        color: 'rgba(0, 0, 0, 0.6)',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        mb: 1,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Available Tickets
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: '#E62B1F',
                        mb: 2,
                      }}
                    >
                      {availableTickets}
                    </Typography>
                    <Button
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={handleAddTicket}
                      sx={{
                        background: '#E62B1F',
                        color: '#FFFFFF',
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: 2,
                        '&:hover': {
                          background: '#c5241a',
                        },
                      }}
                    >
                      Add One Ticket
                    </Button>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Fade in timeout={800}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.98)',
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(230, 43, 31, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 30px rgba(230, 43, 31, 0.2)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{
                        color: 'rgba(0, 0, 0, 0.6)',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        mb: 1,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Total Accepted
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: '#1a1a1a',
                      }}
                    >
                      {totalAccepted}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          </Grid>

          {/* Search and Filters */}
          <Fade in timeout={900}>
            <Card
              elevation={0}
              sx={{
                background: 'rgba(255, 255, 255, 0.98)',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(230, 43, 31, 0.1)',
                mb: 3,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <TextField
                      label="Search by Customer or Phone Number"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      size="small"
                      sx={{
                        flexGrow: 1,
                        minWidth: 200,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': {
                            borderColor: 'rgba(230, 43, 31, 0.4)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#E62B1F',
                          },
                        },
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={() => {
                        setPage(1);
                        fetchRegistrations(1, search, filter);
                      }}
                      sx={{
                        background: '#E62B1F',
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: 2,
                        px: 3,
                        '&:hover': {
                          background: '#c5241a',
                        },
                      }}
                    >
                      Search
                    </Button>
                    <Button
                      variant={registrationForm ? 'outlined' : 'contained'}
                      onClick={() => setRegistrationForm(!registrationForm)}
                      sx={{
                        background: registrationForm
                          ? 'transparent'
                          : '#E62B1F',
                        color: registrationForm ? '#E62B1F' : '#FFFFFF',
                        borderColor: '#E62B1F',
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: 2,
                        '&:hover': {
                          background: registrationForm
                            ? 'rgba(230, 43, 31, 0.1)'
                            : '#c5241a',
                          borderColor: '#E62B1F',
                        },
                      }}
                    >
                      {registrationForm ? 'Hide Form' : 'Show Form'}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<FileDownloadIcon />}
                      onClick={handleExportToExcel}
                      sx={{
                        borderColor: '#E62B1F',
                        color: '#E62B1F',
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: 2,
                        '&:hover': {
                          background: 'rgba(230, 43, 31, 0.1)',
                          borderColor: '#E62B1F',
                        },
                      }}
                    >
                      Export {filter === '' ? 'All' : filter} to Excel
                    </Button>
                  </Box>

                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Button
                      variant={filter === '' ? 'contained' : 'outlined'}
                      onClick={() => {
                        setFilter('');
                        setPage(1);
                        fetchRegistrations(1, search, '');
                      }}
                      sx={{
                        background: filter === '' ? '#E62B1F' : 'transparent',
                        color: filter === '' ? '#FFFFFF' : '#E62B1F',
                        borderColor: '#E62B1F',
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: 2,
                        '&:hover': {
                          background:
                            filter === ''
                              ? '#c5241a'
                              : 'rgba(230, 43, 31, 0.1)',
                        },
                      }}
                    >
                      All
                    </Button>
                    <Button
                      variant={filter === 'Pending' ? 'contained' : 'outlined'}
                      onClick={() => {
                        setFilter('Pending');
                        setPage(1);
                        fetchRegistrations(1, search, 'Pending');
                      }}
                      sx={{
                        background:
                          filter === 'Pending' ? '#E62B1F' : 'transparent',
                        color: filter === 'Pending' ? '#FFFFFF' : '#E62B1F',
                        borderColor: '#E62B1F',
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: 2,
                        '&:hover': {
                          background:
                            filter === 'Pending'
                              ? '#c5241a'
                              : 'rgba(230, 43, 31, 0.1)',
                        },
                      }}
                    >
                      Pending
                    </Button>
                    <Button
                      variant={filter === 'Accepted' ? 'contained' : 'outlined'}
                      onClick={() => {
                        setFilter('Accepted');
                        setPage(1);
                        fetchRegistrations(1, search, 'Accepted');
                      }}
                      sx={{
                        background:
                          filter === 'Accepted' ? '#E62B1F' : 'transparent',
                        color: filter === 'Accepted' ? '#FFFFFF' : '#E62B1F',
                        borderColor: '#E62B1F',
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: 2,
                        '&:hover': {
                          background:
                            filter === 'Accepted'
                              ? '#c5241a'
                              : 'rgba(230, 43, 31, 0.1)',
                        },
                      }}
                    >
                      Accepted
                    </Button>
                    <Button
                      variant={filter === 'Rejected' ? 'contained' : 'outlined'}
                      onClick={() => {
                        setFilter('Rejected');
                        setPage(1);
                        fetchRegistrations(1, search, 'Rejected');
                      }}
                      sx={{
                        background:
                          filter === 'Rejected' ? '#E62B1F' : 'transparent',
                        color: filter === 'Rejected' ? '#FFFFFF' : '#E62B1F',
                        borderColor: '#E62B1F',
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: 2,
                        '&:hover': {
                          background:
                            filter === 'Rejected'
                              ? '#c5241a'
                              : 'rgba(230, 43, 31, 0.1)',
                        },
                      }}
                    >
                      Rejected
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Fade>

          {registrationForm ? (
            <BookingForm
              onSubmitSuccess={() => {
                fetchAvailableTickets();
                fetchTotalAccepted();
                fetchRegistrations(page, search, filter);
              }}
              onSuccess={(message) => {
                setSnackbar({
                  open: true,
                  message,
                  severity: 'success',
                });
              }}
              onError={(message) => {
                setSnackbar({
                  open: true,
                  message,
                  severity: 'error',
                });
              }}
              loading={loading}
              setLoading={setLoading}
            />
          ) : (
            <>
              <Fade in timeout={1000}>
                <Card
                  elevation={0}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(230, 43, 31, 0.1)',
                    overflow: 'hidden',
                  }}
                >
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow
                          sx={{
                            background:
                              'linear-gradient(135deg, #E62B1F 0%, #c5241a 100%)',
                            '& .MuiTableCell-head': {
                              color: '#FFFFFF',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              fontSize: '0.85rem',
                              borderBottom: 'none',
                            },
                          }}
                        >
                          <TableCell>Customer Number</TableCell>
                          <TableCell>Full Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Phone Number</TableCell>
                          <TableCell>Number Of Tickets</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {registrations?.length > 0 ? (
                          registrations?.map((registration) => (
                            <TableRow
                              key={registration?._id}
                              hover
                              sx={{
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  backgroundColor: 'rgba(230, 43, 31, 0.05)',
                                },
                                '& .MuiTableCell-body': {
                                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                                  py: 2,
                                },
                              }}
                              onClick={() => handleRowClick(registration)}
                            >
                              <TableCell
                                sx={{
                                  fontWeight: 600,
                                  color: '#1a1a1a',
                                }}
                              >
                                {registration?.customerNumber}
                              </TableCell>
                              <TableCell>{registration?.fullName}</TableCell>
                              <TableCell>{registration?.email}</TableCell>
                              <TableCell>{registration?.phoneNumber}</TableCell>
                              <TableCell
                                sx={{
                                  fontWeight: 600,
                                  color: '#E62B1F',
                                }}
                              >
                                {registration?.numberOfTickets}
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={registration?.status}
                                  color={getStatusColor(registration?.status)}
                                  size="small"
                                  sx={{
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    fontSize: '0.75rem',
                                  }}
                                />
                              </TableCell>
                              <TableCell onClick={(e) => e.stopPropagation()}>
                                <Stack direction="row" spacing={1}>
                                  <IconButton
                                    size="small"
                                    sx={{
                                      color: '#4caf50',
                                      '&:hover': {
                                        backgroundColor:
                                          'rgba(76, 175, 80, 0.1)',
                                      },
                                      '&.Mui-disabled': {
                                        color: 'rgba(0, 0, 0, 0.26)',
                                      },
                                    }}
                                    disabled={
                                      registration?.status !=='Pending'
                                    }
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAccept(registration?._id);
                                    }}
                                  >
                                    <CheckCircleIcon />
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    sx={{
                                      color: '#f44336',
                                      '&:hover': {
                                        backgroundColor:
                                          'rgba(244, 67, 54, 0.1)',
                                      },
                                      '&.Mui-disabled': {
                                        color: 'rgba(0, 0, 0, 0.26)',
                                      },
                                    }}
                                    disabled={
                                      registration?.status !== 'Pending'
                                    }
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleReject(registration?._id);
                                    }}
                                  >
                                    <CancelIcon />
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    sx={{
                                      color: '#E62B1F',
                                      '&:hover': {
                                        backgroundColor:
                                          'rgba(230, 43, 31, 0.1)',
                                      },
                                    }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRowClick(registration);
                                    }}
                                  >
                                    <VisibilityIcon />
                                  </IconButton>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={7}
                              align="center"
                              sx={{ py: 6, color: 'rgba(0, 0, 0, 0.5)' }}
                            >
                              <Typography variant="body1">
                                No registrations found
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </Fade>

              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    sx={{
                      '& .MuiPaginationItem-root': {
                        color: '#FFFFFF',
                        '&.Mui-selected': {
                          background: '#E62B1F',
                          color: '#FFFFFF',
                          '&:hover': {
                            background: '#c5241a',
                          },
                        },
                        '&:hover': {
                          background: 'rgba(230, 43, 31, 0.2)',
                        },
                      },
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>

      {/* Registration Details Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(230, 43, 31, 0.2)',
          },
        }}
      >
        <DialogTitle
          sx={{
            background: '#E62B1F',
            color: 'white',
            fontWeight: 700,
            fontSize: '1.5rem',
            py: 2.5,
            px: 3,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            borderBottom: '3px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          Registration Details
        </DialogTitle>
        <DialogContent
          sx={{
            pt: 4,
            px: 3,
            pb: 2,
            backgroundColor: 'rgba(250, 250, 250, 0.95)',
          }}
        >
          {selectedRegistration && (
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(230, 43, 31, 0.1)',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#E62B1F',
                    mb: 0.5,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Full Name
                </Typography>
                <Typography sx={{ color: '#1a1a1a' }}>
                  {selectedRegistration?.fullName}
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(230, 43, 31, 0.1)',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#E62B1F',
                    mb: 0.5,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Email
                </Typography>
                <Typography sx={{ color: '#1a1a1a' }}>
                  {selectedRegistration?.email}
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(230, 43, 31, 0.1)',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#E62B1F',
                    mb: 0.5,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Phone Number
                </Typography>
                <Typography sx={{ color: '#1a1a1a' }}>
                  {selectedRegistration?.phoneNumber}
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(230, 43, 31, 0.1)',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#E62B1F',
                    mb: 0.5,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Address
                </Typography>
                <Typography sx={{ color: '#1a1a1a' }}>
                  {selectedRegistration?.address}
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(230, 43, 31, 0.1)',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#E62B1F',
                    mb: 0.5,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Student Status
                </Typography>
                <Typography sx={{ color: '#1a1a1a' }}>
                  {selectedRegistration?.isStudent}
                  {selectedRegistration?.university &&
                    ` - ${selectedRegistration?.university}`}
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(230, 43, 31, 0.1)',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#E62B1F',
                    mb: 0.5,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Gender & Age
                </Typography>
                <Typography sx={{ color: '#1a1a1a' }}>
                  {selectedRegistration?.gender}, {selectedRegistration?.age}{' '}
                  years
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(230, 43, 31, 0.1)',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#E62B1F',
                    mb: 0.5,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Heard About Us
                </Typography>
                <Typography sx={{ color: '#1a1a1a' }}>
                  {selectedRegistration?.heard}
                </Typography>
              </Box>
              {selectedRegistration?.about && (
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(230, 43, 31, 0.1)',
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: '#E62B1F',
                      mb: 0.5,
                      fontSize: '0.85rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    About
                  </Typography>
                  <Typography sx={{ color: '#1a1a1a' }}>
                    {selectedRegistration?.about}
                  </Typography>
                </Box>
              )}
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(230, 43, 31, 0.1)',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#E62B1F',
                    mb: 0.5,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Number of Tickets
                </Typography>
                <Typography
                  sx={{ color: '#1a1a1a', fontWeight: 600, fontSize: '1.1rem' }}
                >
                  {selectedRegistration?.numberOfTickets}
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(230, 43, 31, 0.1)',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#E62B1F',
                    mb: 1,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Status
                </Typography>
                <Chip
                  label={selectedRegistration?.status}
                  color={getStatusColor(selectedRegistration?.status)}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                  }}
                />
              </Box>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: 'rgba(230, 43, 31, 0.1)',
                  border: '1px solid rgba(230, 43, 31, 0.3)',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#E62B1F',
                    mb: 0.5,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Customer Number
                </Typography>
                <Typography
                  sx={{ color: '#1a1a1a', fontWeight: 700, fontSize: '1.1rem' }}
                >
                  {selectedRegistration?.customerNumber}
                </Typography>
              </Box>
            </Stack>
          )}
          <Box
            sx={{
              mt: 3,
              pt: 2,
              display: 'flex',
              justifyContent: 'flex-end',
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          >
            <Button
              onClick={handleCloseDialog}
              variant="contained"
              sx={{
                background: '#E62B1F',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                px: 4,
                py: 1.2,
                borderRadius: 2,
                fontWeight: 600,
                color: '#FFFFFF',
                fontSize: '0.9rem',
                boxShadow: '0 2px 8px rgba(230, 43, 31, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: '#c5241a',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(230, 43, 31, 0.4)',
                },
              }}
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={Fade}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{
            width: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            fontSize: '1rem',
            fontWeight: 500,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TicketsManagement;
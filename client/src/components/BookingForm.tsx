import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  Alert,
  Snackbar,
  Fade,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { apiConfig } from '../config/api';
import { apiRequest } from '../services/api';

interface AttendeeData {
  fullName: string;
  gender: string;
  age: string;
  isStudent: string;
  university?: string;
}

interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  isStudent: string;
  university?: string;
  gender: string;
  age: string;
  heard: string;
  about: string;
  ticketType: 'main' | 'full';
  numberOfTickets: number;
  attendees: AttendeeData[];
  agreeTerms: boolean;
}

interface BookingFormProps {
  onSubmitSuccess?: () => void;
  onError?: (message: string) => void;
  onSuccess?: (message: string) => void;
  loading?: boolean;
  setLoading?: (loading: boolean) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  onSubmitSuccess,
  onError,
  onSuccess,
  loading: externalLoading,
  setLoading: setExternalLoading,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      ticketType: 'main',
      numberOfTickets: 1,
      attendees: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attendees',
  });

  const watchIsStudentMain = watch('isStudent');
  const watchTicketType = watch('ticketType');
  const watchNumberOfTickets = watch('numberOfTickets');

  const currentTicketPrice = watchTicketType === 'full' ? 14.5 : 10.5;
  const ticketCount = Math.max(1, Number(watchNumberOfTickets) || 1);
  const totalJd = (ticketCount * currentTicketPrice).toFixed(2);

  const isLoading = externalLoading !== undefined ? externalLoading : loading;
  const setIsLoading = setExternalLoading || setLoading;

  useEffect(() => {
    const currentFieldsCount = fields.length;
    const neededFieldsCount = ticketCount - 1;

    if (neededFieldsCount > currentFieldsCount) {
      for (let i = currentFieldsCount; i < neededFieldsCount; i++) {
        append({ fullName: '', gender: '', age: '', isStudent: '', university: '' });
      }
    } else if (neededFieldsCount < currentFieldsCount) {
      for (let i = currentFieldsCount - 1; i >= neededFieldsCount; i--) {
        remove(i);
      }
    }
  }, [ticketCount, fields.length, append, remove]);

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
    if (severity === 'success') {
      onSuccess?.(message);
    } else {
      onError?.(message);
    }
  };
const onSubmit = async (data: FormData) => {
  try {
    setIsLoading(true);

    const allAttendees = [
      {
        name: data.fullName,
        email: data.email,
        phone: data.phoneNumber,
        gender: data.gender,
        age: data.age,
        isStudent: data.isStudent,
        university: data.university || '',
      },
      // هنا نقوم بملء بيانات الأشخاص الإضافيين، ونعطيهم إيميل وهاتف الشخص الأول تلقائياً
      ...(data.attendees || []).map((att: any) => ({
        name: att.fullName || att.name,
        email: data.email,        // استخدام إيميل الشخص الأول المسجِّل
        phone: data.phoneNumber,  // استخدام هاتف الشخص الأول المسجِّل
        gender: att.gender,
        age: att.age,
        isStudent: att.isStudent,
        university: att.university || '',
      })),
    ];

    const payload = {
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      isStudent: data.isStudent,
      gender: data.gender,
      age: data.age,
      university: data.university || '',
      buyerName: data.fullName,
      address: data.address,
      heard: data.heard,
      about: data.about,
      ticketType: data.ticketType,
      numberOfTickets: ticketCount,
      totalAmount: parseFloat(totalJd),
      attendees: allAttendees,
    };

    await apiRequest(apiConfig.endpoints.registration.register, 'POST', payload);

    showSnackbar('Registration Successful! Tickets will be sent to your email.', 'success');
    reset();
    onSubmitSuccess?.();
  } catch (error: unknown) {
    console.error('Error details:', error);
    showSnackbar('Something went wrong!', 'error');
  } finally {
    setIsLoading(false);
  }
};
  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          py: { xs: 3, sm: 6 },
          position: 'relative',
          zIndex: 1,
        }}
      >
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
            <CardContent sx={{ p: { xs: 3, sm: 5, md: 6 } }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    color: '#1a1a1a',
                    mb: 1,
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                  }}
                >
                  Book Your Tickets
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.7)', mt: 1 }}>
                  Join us for an inspiring TEDx experience
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{
                '& .MuiTextField-root, & .MuiFormControl-root': {
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.2)' },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(230, 43, 31, 0.15)',
                      '& fieldset': { borderColor: 'rgba(230, 43, 31, 0.4)' },
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                      boxShadow: '0 4px 20px rgba(230, 43, 31, 0.2)',
                      '& .MuiOutlinedInput-notchedOutline': { borderWidth: 2, borderColor: '#E62B1F' },
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontWeight: 500,
                    color: 'rgba(0, 0, 0, 0.7)',
                    '&.Mui-focused': { color: '#E62B1F' },
                  },
                }
              }}>
                
                {/* قسم اختيار التذاكر */}
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  <Grid size={{ xs: 12, sm: 8 }}>
                    <FormControl fullWidth>
                      <InputLabel>Select Ticket Pathway</InputLabel>
                      <Select
                        label="Select Ticket Pathway"
                        {...register('ticketType')}
                        value={watchTicketType}
                        fullWidth
                      >
                        <MenuItem value="main">Main TEDx Event (نقطة البداية) — 10.50 JD</MenuItem>
                        <MenuItem value="full">Full Pathway (Pre-TEDx + Main) — 14.50 JD</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <FormControl fullWidth>
                      <InputLabel>Number of Tickets</InputLabel>
                      <Select
                        label="Number of Tickets"
                        {...register('numberOfTickets')}
                        value={watchNumberOfTickets}
                        onChange={(e) => setValue('numberOfTickets', Number(e.target.value))}
                        fullWidth
                      >
                        {[1, 2, 3].map((num) => (
                          <MenuItem key={num} value={num}>{num} Tickets</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={12}>
                    <Alert severity="info" sx={{ borderRadius: 2, fontWeight: 600 }}>
                      Selected: {watchTicketType === 'full' ? 'Full Pathway' : 'Main Event'} ({currentTicketPrice} JD per ticket). Total Amount: {totalJd} JD
                    </Alert>
                  </Grid>
                </Grid>

                {/* عنوان تفاصيل المشتري */}
                <Box sx={{ mt: 4, mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#E62B1F' }}>
                    Primary Attendee {ticketCount > 1 && '(Ticket #1)'}
                  </Typography>
                  <Divider sx={{ mt: 1, backgroundColor: 'rgba(230, 43, 31, 0.2)' }} />
                </Box>

                <Grid container spacing={2.5}>
                  {/* السطر الأول */}
                  <Grid size={{ xs: 12, sm: 5 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      {...register('fullName', { required: 'Full Name is required' })}
                      error={!!errors.fullName}
                      helperText={errors.fullName?.message}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 3 }}>
                    <TextField
                      fullWidth
                      label="Age"
                      type="number"
                      {...register('age', { required: 'Age is required' })}
                      error={!!errors.age}
                      helperText={errors.age?.message}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <FormControl fullWidth error={!!errors.gender}>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        fullWidth
                        label="Gender"
                        {...register('gender', { required: 'Gender is required' })}
                        defaultValue=""
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </Select>
                      {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  {/* السطر الثاني */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      {...register('phoneNumber', { required: 'Phone Number is required' })}
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber?.message}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email (Tickets will be sent here)"
                      type="email"
                      {...register('email', { required: 'Email is required' })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Grid>

                  {/* السطر الثالث */}
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="Address"
                      {...register('address', { required: 'Address is required' })}
                      error={!!errors.address}
                      helperText={errors.address?.message}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <FormControl fullWidth error={!!errors.isStudent}>
                      <InputLabel>Are You A Student?</InputLabel>
                      <Select
                        fullWidth
                        label="Are You A Student?"
                        {...register('isStudent', { required: 'This field is required' })}
                        defaultValue=""
                      >
                        <MenuItem value="yes">Yes</MenuItem>
                        <MenuItem value="no">No</MenuItem>
                      </Select>
                      {errors.isStudent && <FormHelperText>{errors.isStudent.message}</FormHelperText>}
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="If Yes, What University/School?"
                      {...register('university')}
                      disabled={watchIsStudentMain !== 'yes'}
                    />
                  </Grid>
                </Grid>
                  {/* السطر الرابع والنهائي */}
                <Box sx={{ mt: 5 }}>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="How Did You Hear About TEDx Shmeisani"
                        multiline
                        rows={4}
                        {...register('heard', { required: 'This field is required' })}
                        error={!!errors.heard}
                        helperText={errors.heard?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Tell Us About Yourself (Optional)"
                        multiline
                        rows={4}
                        {...register('about')}
                      />
                    </Grid>

                {/* الحاضرين الإضافيين */}
                {fields.map((field, index) => {
                  const attendeeIndex = index; 
                  const isStudentWatched = watch(`attendees.${attendeeIndex}.isStudent`);
                  
                  return (
                    <Box key={field.id} sx={{ mt: 5 }}>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#E62B1F' }}>
                          Attendee {attendeeIndex + 2} Details (Ticket #{attendeeIndex+2})
                        </Typography>
                        <Divider sx={{ mt: 1, backgroundColor: 'rgba(230, 43, 31, 0.2)' }} />
                      </Box>

                      <Grid container spacing={2.5}>
                        <Grid size={{ xs: 12, sm: 5 }}>
                          <TextField
                            fullWidth
                            label={`Full Name (Attendee ${attendeeIndex + 2})`}
                            {...register(`attendees.${attendeeIndex}.fullName` as const, { required: 'Required' })}
                            error={!!errors.attendees?.[attendeeIndex]?.fullName}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 3 }}>
                          <TextField
                            fullWidth
                            label="Age"
                            type="number"
                            {...register(`attendees.${attendeeIndex}.age` as const, { required: 'Required' })}
                            error={!!errors.attendees?.[attendeeIndex]?.age}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                          <FormControl fullWidth error={!!errors.attendees?.[attendeeIndex]?.gender}>
                            <InputLabel>Gender</InputLabel>
                            <Select
                              fullWidth
                              label="Gender"
                              {...register(`attendees.${attendeeIndex}.gender` as const, { required: 'Required' })}
                              defaultValue=""
                            >
                              <MenuItem value="male">Male</MenuItem>
                              <MenuItem value="female">Female</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                          <FormControl fullWidth error={!!errors.attendees?.[attendeeIndex]?.isStudent}>
                            <InputLabel>Are They A Student?</InputLabel>
                            <Select
                              fullWidth
                              label="Are They A Student?"
                              {...register(`attendees.${attendeeIndex}.isStudent` as const, { required: 'Required' })}
                              defaultValue=""
                            >
                              <MenuItem value="yes">Yes</MenuItem>
                              <MenuItem value="no">No</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label="If Yes, What University/School?"
                            {...register(`attendees.${attendeeIndex}.university` as const)}
                            disabled={isStudentWatched !== 'yes'}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  );
                })}

              

                    <Grid size={12}>
                      <Box sx={{ p: 2, borderRadius: 2, backgroundColor: 'rgba(230, 43, 31, 0.05)', border: '1px solid rgba(230, 43, 31, 0.2)' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...register('agreeTerms', { required: 'You must agree to the terms' })}
                              sx={{ color: '#E62B1F', '&.Mui-checked': { color: '#E62B1F' } }}
                            />
                          }
                          label={
                            <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, color: 'rgba(0, 0, 0, 0.8)' }}>
                              I agree to the{' '}
                              <Button
                                variant="text"
                                onClick={() => setOpenDialog(true)}
                                sx={{ p: 0, minWidth: 'auto', textTransform: 'none', color: '#E62B1F', fontWeight: 600, textDecoration: 'underline' }}
                              >
                                Terms and Policies
                              </Button>{' '}
                              *
                            </Typography>
                          }
                        />
                        {errors.agreeTerms && (
                          <FormHelperText error sx={{ ml: 4.5, color: '#E62B1F !important' }}>
                            {errors.agreeTerms.message}
                          </FormHelperText>
                        )}
                      </Box>
                    </Grid>

                    <Grid size={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={isLoading}
                        sx={{
                          mt: 1,
                          py: 1.5,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          borderRadius: 2,
                          background: isLoading ? '#666666' : '#E62B1F',
                          boxShadow: isLoading ? 'none' : '0 4px 15px rgba(230, 43, 31, 0.4)',
                          '&:hover': { background: isLoading ? '#666666' : '#c5241a' },
                        }}
                      >
                        {isLoading ? 'Submitting...' : `Submit`}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>

              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ background: '#E62B1F', color: 'white', fontWeight: 700 }}>
          Terms and Conditions
        </DialogTitle>
        <DialogContent sx={{ pt: 4, px: 3, pb: 2, backgroundColor: 'rgba(250, 250, 250, 0.95)' }}>
          <Typography variant="h6" paragraph sx={{ fontWeight: 700, color: '#E62B1F' }}>
            Terms and Conditions for TEDx Shmeisani Event
          </Typography>
          <Typography variant="body2" paragraph>
            By purchasing a ticket and attending this event, you agree to the terms and conditions...
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button onClick={() => setOpenDialog(false)} variant="contained" sx={{ background: '#E62B1F' }}>
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BookingForm;
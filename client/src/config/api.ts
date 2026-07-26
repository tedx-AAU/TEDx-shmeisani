const API_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.REACT_APP_API_URL ||
  'http://localhost:5001';

export const apiConfig = {
  baseURL: API_URL,
  endpoints: {
    admin: {
      login: `${API_URL}/api/admin/login`,
      verify: `${API_URL}/api/admin/verify`,
      ticketsLogin: `${API_URL}/api/admin/tickets-login`,
      ticketsVerify: `${API_URL}/api/admin/tickets-verify`,
    },
    registration: {
      ticketsAvailable: `${API_URL}/api/registration/tickets/available`,
      ticketsAdd: `${API_URL}/api/registration/tickets/add`,
      registrations: `${API_URL}/api/registration/registrations`,
      registrationsAcceptedCount: `${API_URL}/api/registration/registrations/accepted/count`,
      registrationsExport: `${API_URL}/api/registration/registrations/export`,
      registrationsById: `${API_URL}/api/registration/registrations/:id`,
      register: `${API_URL}/api/registration`,
      sendOtp: `${API_URL}/api/registration/send-otp`,
      verifyOtp: `${API_URL}/api/registration/verify-otp`,
    },
    checkin: {
      login: `${API_URL}/api/checkin/login`,
      verify: `${API_URL}/api/checkin/verify`,
      lookup: (ticketCode: string) => `${API_URL}/api/checkin/${ticketCode}`,
      confirm: (ticketCode: string) => `${API_URL}/api/checkin/${ticketCode}`,
    },
  },
};

export default apiConfig;

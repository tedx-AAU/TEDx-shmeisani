// API Configuration (Vite only injects VITE_* / configured prefixes — not CRA's REACT_APP_* unless envPrefix includes it)
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
  },
};

export default apiConfig;

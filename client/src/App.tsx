import CssBaseline from '@mui/material/CssBaseline';
import Booking from './pages/Booking';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useMemo } from 'react';
import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import TicketsLogin from './pages/TicketsLogin';
import TicketsManagement from './pages/TicketsManagement';
import SpeakersPage from './pages/SpeakersPage';
import SchedulePage from './pages/SchedulePage';
import TeamPage from './pages/TeamPage';
import TicketsPage from './pages/TicketsPage';
import Home from './pages/Home'; 

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
};

const RouterContent: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} /> 
        <Route path="/tickets" element={<Booking />} />
        <Route path="/speakers" element={<SpeakersPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        </Route>

        <Route path="/tickets-login" element={<TicketsLogin />} /> 
        <Route path="/tickets-management" element={<TicketsManagement />} />
      
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

const PublicLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentView = useMemo(() => {
    const path = location.pathname;
    if (path === '/' || path === '/home') return 'home';
    if (path.startsWith('/speakers')) return 'speakers';
    if (path.startsWith('/schedule')) return 'schedule';
    if (path.startsWith('/team')) return 'team';
    if (path.startsWith('/tickets-login')) return 'tickets-login';
    if (path.startsWith('/tickets-management')) return 'tickets-management';
    if (path.startsWith('/tickets')) return 'tickets';
    return 'home';
  }, [location.pathname]);

  const handleNavigate = (
    view:
      | 'home'
      | 'speakers'
      | 'schedule'
      | 'team'
      | 'tickets-login'
      | 'tickets-management'
      | 'tickets'
  ) => {
    const routes: Record<typeof view, string> = {
      home: '/',
      speakers: '/speakers',
      schedule: '/schedule',
      team: '/team',
      tickets: '/tickets',
      'tickets-login': '/tickets-login',
      'tickets-management': '/tickets-management',
    };
    navigate(routes[view]);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <RouterContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

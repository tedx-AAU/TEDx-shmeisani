import React, {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { apiConfig } from '../config/api';

const STORAGE_KEY = 'checkinStaffToken';

interface CheckinStaff {
  id: string;
  username: string;
  role: string;
}

interface CheckinAuthContextType {
  isCheckinAuthenticated: boolean;
  staff: CheckinStaff | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const CheckinAuthContext = createContext<CheckinAuthContextType | undefined>(
  undefined
);

export const useCheckinAuth = () => {
  const ctx = useContext(CheckinAuthContext);
  if (!ctx) throw new Error('useCheckinAuth must be used within CheckinAuthProvider');
  return ctx;
};

export const CheckinAuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isCheckinAuthenticated, setIsCheckinAuthenticated] = useState(false);
  const [staff, setStaff] = useState<CheckinStaff | null>(null);
  const [loading, setLoading] = useState(true);

  // ── Silently verify token on mount ─────────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(apiConfig.endpoints.checkin.verify, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Invalid token');
      })
      .then((data) => {
        setStaff(data.staff);
        setIsCheckinAuthenticated(true);
      })
      .catch(() => {
        localStorage.removeItem(STORAGE_KEY);
        setStaff(null);
        setIsCheckinAuthenticated(false);
      })
      .finally(() => setLoading(false));
  }, []);

  // ── Login ──────────────────────────────────────────────────────────────
  const login = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      try {
        const res = await fetch(apiConfig.endpoints.checkin.login, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
          const err = await res.json();
          console.error('Checkin login failed:', err.error);
          return false;
        }

        const data = await res.json();
        localStorage.setItem(STORAGE_KEY, data.token);
        setStaff(data.staff);
        setIsCheckinAuthenticated(true);
        return true;
      } catch (err) {
        console.error('Checkin login error:', err);
        return false;
      }
    },
    []
  );

  // ── Logout ─────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setStaff(null);
    setIsCheckinAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({ isCheckinAuthenticated, staff, loading, login, logout }),
    [isCheckinAuthenticated, staff, loading, login, logout]
  );

  return (
    <CheckinAuthContext.Provider value={value}>
      {children}
    </CheckinAuthContext.Provider>
  );
};

// Helper: returns the stored token for API calls
export const getCheckinToken = () =>
  localStorage.getItem('checkinStaffToken') || '';

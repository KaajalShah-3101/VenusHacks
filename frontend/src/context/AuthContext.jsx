import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'accessmap_user';

function loadUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);
  const [profileComplete, setProfileComplete] = useState(
    () => localStorage.getItem('accessmap_profile_complete') === 'true'
  );

  const value = useMemo(
    () => ({
      user,
      profileComplete,
      setUser: (next) => {
        setUser(next);
        if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        else localStorage.removeItem(STORAGE_KEY);
      },
      setProfileCompleteStatus: (status) => {
        setProfileComplete(status);
        localStorage.setItem('accessmap_profile_complete', status ? 'true' : 'false');
      },
      markProfileComplete: () => {
        setProfileComplete(true);
        localStorage.setItem('accessmap_profile_complete', 'true');
      },
      logout: () => {
        setUser(null);
        setProfileComplete(false);
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('accessmap_profile_complete');
      },
    }),
    [user, profileComplete]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

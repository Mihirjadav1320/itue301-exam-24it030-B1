import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [attendee, setAttendee] = useState(() => JSON.parse(localStorage.getItem('attendee') || 'null'));
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [role, setRole] = useState(() => localStorage.getItem('role'));

  const login = (data) => {
    setAttendee(data.attendee);
    setToken(data.token);
    setRole(data.role);
    localStorage.setItem('attendee', JSON.stringify(data.attendee));
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
  };

  const logout = () => {
    setAttendee(null);
    setToken(null);
    setRole(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ attendee, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
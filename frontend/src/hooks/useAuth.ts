import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem('token');

  const saveToken = (token: string) => localStorage.setItem('token', token);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return { isAuthenticated, saveToken, logout };
}

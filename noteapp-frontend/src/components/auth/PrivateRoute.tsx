import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingOverlay from '../LoadingOverlay';

interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <LoadingOverlay isDark={false} />;
  }

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoute;
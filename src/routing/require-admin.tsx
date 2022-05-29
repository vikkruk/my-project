import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRootSelector } from '../store/hooks';
import { selectAuthLoggedIn } from '../store/features/auth/auth-selectors';

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const admin = useRootSelector(selectAuthLoggedIn);

  if (!admin) {
    return <Navigate to="/auth/login?next=/admin" />;
  }
  return children;
};

export default RequireAdmin;

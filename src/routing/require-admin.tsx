import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRootSelector } from '../store/hooks';
import { selectAuthRole } from '../store/features/auth/auth-selectors';

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const role = useRootSelector(selectAuthRole);

  if (role === undefined || role !== 'admin') {
    return <Navigate to="/auth/login?next=/admin" />;
  }
  return children;
};

export default RequireAdmin;

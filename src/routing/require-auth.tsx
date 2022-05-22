import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useRootSelector } from '../store/hooks';
import { selectAuthLoggedIn } from '../store/features/auth/auth-selectors';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const loggedIn = useRootSelector(selectAuthLoggedIn);
  const location = useLocation();

  if (!loggedIn) {
    return <Navigate to={`/auth/login?next=${location.pathname}`} />;
  }
  return children;
};

export default RequireAuth;

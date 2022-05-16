import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../features/auth-context';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { loggedIn } = useContext(AuthContext);
  const location = useLocation();

  if (!loggedIn) {
    return <Navigate to={`/auth/login?next=${location.pathname}`} />;
  }
  return children;
};

export default RequireAuth;

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../features/auth-context';

const RequireVisitor = ({ children }: { children: JSX.Element }) => {
  const { loggedIn } = useContext(AuthContext);

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireVisitor;

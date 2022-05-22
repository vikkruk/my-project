import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRootSelector } from '../store/hooks';
import { selectAuthLoggedIn } from '../store/features/auth/auth-selectors';
import { selectNavigationNext } from '../store/features/navigation/navigation-selectors';

const RequireVisitor = ({ children }: { children: JSX.Element }) => {
  const loggedIn = useRootSelector(selectAuthLoggedIn);
  const next = useRootSelector(selectNavigationNext);

  if (loggedIn) {
    return <Navigate to={next ?? '/'} />;
  }

  return children;
};

export default RequireVisitor;

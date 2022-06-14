import React from 'react';
import {
 Route,
 Routes,
 useLocation,
} from 'react-router-dom';
import { useRootDispatch, useRootSelector } from './store/hooks';
import { selectAuthLoggedIn, selectAuth } from './store/features/auth/auth-selectors';
import { createAuthenticateActionThunk } from './store/features/auth/auth-action-creators';
import AdminPage from './pages/admin-page';
import HomePage from './pages/home-page';
import ActorsPage from './pages/actors-page';
import DirectorsPage from './pages/directors-page';
import MoviesPage from './pages/movies-page';
import RegisterPage from './pages/register-page';
import LoginPage from './pages/login-page';
import ProfilePage from './pages/profile-page';
import NavbarLayout from './layouts/navbar-layout';
import RequireAdmin from './routing/require-admin';
import RequireAuth from './routing/require-auth';
import RequireVisitor from './routing/require-visitor';
import FormLoadingAnimation from './components/loading-animation';

const App: React.FC = () => {
  const location = useLocation();
  const dispatch = useRootDispatch();
  const loggedIn = useRootSelector(selectAuthLoggedIn);
  const { token, loading } = useRootSelector(selectAuth);
  if (token && !loggedIn) {
   if (!loading) {
      dispatch(createAuthenticateActionThunk(token, location.pathname));
    }
    return (
      <FormLoadingAnimation />
);
  }
  return (

    <Routes>
      <Route path="/" element={<NavbarLayout />}>
        <Route index element={<HomePage />} />
        <Route path="actors" element={<ActorsPage />} />
        <Route path="directors" element={<DirectorsPage />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route
          path="auth/login"
          element={(
            <RequireVisitor>
              <LoginPage />
            </RequireVisitor>
          )}
        />
        <Route
          path="auth/register"
          element={(
            <RequireVisitor>
              <RegisterPage />
            </RequireVisitor>
          )}
        />
        <Route
          path="admin"
          element={
          (
            <RequireAdmin>
              <AdminPage />
            </RequireAdmin>
          )
          }
        />
        <Route
          path="profile"
          element={(
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          )}
        />
      </Route>
    </Routes>

);
};

export default App;

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRootDispatch, useRootSelector } from './store/hooks';
import { selectAuthToken, selectAuthLoggedIn } from './store/features/auth/auth-selectors';
import { createAuthenticateActionThunk } from './store/features/auth/auth-action-creators';
import ActorsPage from './pages/actors-page';
import AdminPage from './pages/admin-page';
import DirectorsPage from './pages/directors-page';
import HomePage from './pages/home-page';
import LoginPage from './pages/login-page';
import MoviesPage from './pages/movies-page';
import ProfilePage from './pages/profile-page';
import RegisterPage from './pages/register-page';
import NavbarLayout from './layouts/navbar-layout';
import RequireAdmin from './routing/require-admin';
import RequireAuth from './routing/require-auth';
import RequireVisitor from './routing/require-visitor';

const App: React.FC = () => {
  const dispatch = useRootDispatch();
  const loggedIn = useRootSelector(selectAuthLoggedIn);
  const token = useRootSelector(selectAuthToken);
  if (token && !loggedIn) {
    dispatch(createAuthenticateActionThunk(token));
    return (
      <>
        Autentifikuojama...
      </>
);
  }
  return (
    <BrowserRouter>
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
    </BrowserRouter>

);
};

export default App;

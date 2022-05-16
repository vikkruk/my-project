import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './features/auth-context';
import NavbarLayout from './layouts/navbar-layout';
import ActorsPage from './pages/actors-page.tsx';
import DirectorsPage from './pages/directors-page';
import HomePage from './pages/home-page';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import RequireAuth from './routing/require-auth';
import RequireVisitor from './routing/require-visitor';

const App: React.FC = () => (
  <BrowserRouter>
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<NavbarLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="actors"
            element={(
              <RequireAuth>
                <ActorsPage />
              </RequireAuth>
        )}
          />
          <Route path="directors" element={<DirectorsPage />} />
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
        </Route>
      </Routes>
    </AuthContextProvider>
  </BrowserRouter>

);

export default App;

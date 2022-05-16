import React from 'react';
import { Provider } from 'react-redux';
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
import store from './store/index';

const App: React.FC = () => (
  <BrowserRouter>
    <AuthContextProvider>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<NavbarLayout />}>
            <Route index element={<HomePage />} />
            <Route
              path="actors"
              element={<ActorsPage />}
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
      </Provider>
    </AuthContextProvider>
  </BrowserRouter>

);

export default App;

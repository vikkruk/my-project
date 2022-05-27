import React, { useContext } from 'react';
import {
  AppBar, Avatar, Box, Container, Toolbar, Typography,
} from '@mui/material';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';

import StyledNavLink from '../../components/styled-navlink';
import StyledHomeNavLink from '../../components/styled-home-navlink';
import NavbarLoggedInMenu from './navbar-logged-in-menu';
import { User } from '../../types';
import { useRootSelector, useRootDispatch } from '../../store/hooks';
import { selectAuthLoggedIn, selectAuthUser } from '../../store/features/auth/auth-selectors';
import { authLogoutAction } from '../../store/features/auth/auth-action-creators';

const NavBar: React.FC = () => {
  const loggedIn = useRootSelector(selectAuthLoggedIn);
  const user = useRootSelector(selectAuthUser);
  const dispatch = useRootDispatch();

  const logout = () => dispatch(authLogoutAction);

  return (
    <AppBar position="static" sx={(theme) => ({ bgcolor: theme.palette.primary.main })}>
      <Container sx={{ px: { xs: 0, sm: 0 } }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            component="p"
            variant="h4"
            sx={(theme) => ({ color: theme.palette.secondary.main, fontWeight: 600 })}
          >
            <AccessibleForwardIcon sx={{ mr: 3, fontSize: 30 }} />
            <StyledHomeNavLink to="/">GMW</StyledHomeNavLink>

          </Typography>
          <Box>
            <StyledNavLink to="/actors">Actors</StyledNavLink>
            <StyledNavLink to="/directors">Directors</StyledNavLink>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {(loggedIn && ((user && user.avatar) ? (
              <>
                <NavbarLoggedInMenu avatar={`${(user as User).avatar}`} nickname={`${user.nickname}`} />
                <StyledHomeNavLink to="/auth/login" onClick={logout}>Logout</StyledHomeNavLink>
                {' '}
              </>
            ) : (
              <>
                <Typography fontWeight={600}>{user?.email}</Typography>
                <Avatar>{user?.email.slice(0, 2)}</Avatar>
                <StyledHomeNavLink to="/auth/login" onClick={logout}>Logout</StyledHomeNavLink>
              </>
            ))) || (<StyledNavLink to="/auth/login">Login</StyledNavLink>)}

          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;

import React, { useContext } from 'react';
import {
  AppBar, Avatar, Box, Container, Toolbar, Typography,
} from '@mui/material';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';

import StyledNavLink from '../../components/styled-navlink';
import StyledHomeNavLink from '../../components/styled-home-navlink';
import AuthContext from '../../features/auth-context';
import NavbarLoggedInMenu from './navbar-logged-in-menu';
import { User } from '../../types';

const NavBar: React.FC = () => {
  const { loggedIn, user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static" sx={(theme) => ({ bgcolor: theme.palette.themeBlueColor.main })}>
      <Container sx={{ px: { xs: 0, sm: 0 } }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            component="p"
            variant="h4"
            sx={(theme) => ({ color: theme.palette.themeLightColor.main, fontWeight: 600 })}
          >
            <AccessibleForwardIcon sx={{ mr: 3, fontSize: 30 }} />
            <StyledHomeNavLink to="/">GMW</StyledHomeNavLink>

          </Typography>
          <Box>
            <StyledNavLink to="/actors">Actors</StyledNavLink>
            <StyledNavLink to="/directors">Directors</StyledNavLink>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {(loggedIn && ((user && user.avatar) ? <NavbarLoggedInMenu avatar={`${(user as User).avatar}`} nickname={`${user.nickname}`} /> : (
              <>
                <Typography fontWeight={600}>{user?.email}</Typography>
                <Avatar>{user?.email.slice(0, 2)}</Avatar>
              </>
            ))) || (<StyledNavLink to="/auth/login">Login</StyledNavLink>)}
            <StyledHomeNavLink to="/auth/login" onClick={logout}>Logout</StyledHomeNavLink>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;

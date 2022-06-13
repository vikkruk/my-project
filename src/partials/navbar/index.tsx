import React from 'react';
import {
  AppBar, Avatar, Box, Container, Toolbar, Typography,
} from '@mui/material';
import { User } from '../../types';
import StyledNavLink from '../../components/styled-navlink';
import StyledHomeNavLink from '../../components/styled-home-navlink';
import NavbarLoggedInMenu from './navbar-logged-in-menu';
import { useRootSelector, useRootDispatch } from '../../store/hooks';
import { selectAuthLoggedIn, selectAuthUser } from '../../store/features/auth/auth-selectors';
import { authLogoutAction } from '../../store/features/auth/auth-action-creators';
import NavbarDropDownMenu from './navbar-drop-down-menu';

const NavBar: React.FC = () => {
  const loggedIn = useRootSelector(selectAuthLoggedIn);
  const user = useRootSelector(selectAuthUser);
  const admin = 'placeholder';
  const dispatch = useRootDispatch();

  const logout = () => dispatch(authLogoutAction);

  return (
    <AppBar position="static" sx={(theme) => ({ bgcolor: theme.palette.primary.main })}>
      <Container sx={{ px: { xs: 0, sm: 0 } }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <NavbarDropDownMenu />
          <Typography
            component="p"
            variant="h4"
            sx={(theme) => ({ color: theme.palette.secondary.main, fontWeight: 600 })}
          >
            <StyledHomeNavLink to="/">GMW</StyledHomeNavLink>
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'space-around', gap: 2 }}>
            {admin && <StyledNavLink to="/admin">Admin</StyledNavLink>}
            {loggedIn && <StyledNavLink to="/profile">Profile</StyledNavLink>}
            <StyledNavLink to="/actors">Actors</StyledNavLink>
            <StyledNavLink to="/directors">Directors</StyledNavLink>
            <StyledNavLink to="/movies">Movies</StyledNavLink>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {(loggedIn && ((user && user.avatar) ? (
              <>
                <NavbarLoggedInMenu
                  avatar={`${(user as User).avatar}`}
                  nickname={`${user.nickname}`}
                />
                <StyledHomeNavLink
                  to="/auth/login"
                  sx={{ display: { xs: 'none', md: 'block' } }}
                  onClick={logout}
                >
                  Logout

                </StyledHomeNavLink>
                {' '}
              </>
            ) : (
              <>
                <Typography fontWeight={600}>{user?.email}</Typography>
                <Avatar>{user?.email.slice(0, 2)}</Avatar>
                <StyledHomeNavLink sx={{ display: { xs: 'none', md: 'block' } }} to="/auth/login" onClick={logout}>Logout</StyledHomeNavLink>
              </>
            )))
            || (<StyledNavLink to="/auth/login">Login</StyledNavLink>)}

          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;

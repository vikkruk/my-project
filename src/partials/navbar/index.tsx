import React from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import NavbarLoggedInMenu from './navbar-logged-in-menu';
import NavbarDropDownMenu from './navbar-drop-down-menu';
import StyledNavLink from '../../components/styled-navlink';
import StyledHomeNavLink from '../../components/styled-home-navlink';
import { User } from '../../types';
import { useRootSelector, useRootDispatch } from '../../store/hooks';
import { authLogoutAction } from '../../store/features/auth/auth-action-creators';
import {
 selectAuthLoggedIn, selectAuthRole, selectAuthUser, selectAuth,
} from '../../store/features/auth/auth-selectors';

const NavBar: React.FC = () => {
  const loggedIn = useRootSelector(selectAuthLoggedIn);
  const role = useRootSelector(selectAuthRole);
  const { user, loading } = useRootSelector(selectAuth);
  const dispatch = useRootDispatch();

  const logout = () => dispatch(authLogoutAction);
  return (
    <AppBar position="fixed" sx={(theme) => ({ bgcolor: theme.palette.primary.main })}>
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
            {role === 'admin' && <StyledNavLink to="/admin">Admin</StyledNavLink>}
            {loggedIn && <StyledNavLink to="/profile">Profile</StyledNavLink>}
            <StyledNavLink to="/actors">Actors</StyledNavLink>
            <StyledNavLink to="/directors">Directors</StyledNavLink>
            <StyledNavLink to="/movies">Movies</StyledNavLink>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {loggedIn && ((user && user.avatar) ? (
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
                <StyledHomeNavLink sx={{ display: { xs: 'none', md: 'block' } }} to="/" onClick={logout}>Logout</StyledHomeNavLink>
              </>
            ))}
            {!loggedIn && !loading && (<StyledNavLink to="/auth/login">Login</StyledNavLink>)}

          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;

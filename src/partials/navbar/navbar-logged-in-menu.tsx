import { Avatar, Box, Typography } from '@mui/material';
import React, { useContext } from 'react';
import AuthContext from '../../features/auth-context';
import StyledHomeNavLink from '../../components/styled-home-navlink';

type NavbarLoggedInMenuProps = {
  avatar: string,
  nickname: string,
};

const NavbarLoggedInMenu: React.FC<NavbarLoggedInMenuProps> = ({ avatar, nickname }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
    <Typography fontWeight={600}>{nickname}</Typography>
    <Avatar alt="user-avatar" src={avatar} sx={{ height: 50, width: 50 }} />
  </Box>
);

export default NavbarLoggedInMenu;

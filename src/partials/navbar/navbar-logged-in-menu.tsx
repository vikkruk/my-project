import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';

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

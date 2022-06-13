import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
 Avatar,
  Box,
  Typography,
} from '@mui/material';

type NavbarLoggedInMenuProps = {
  avatar: string,
  nickname: string,
};

const NavbarLoggedInMenu: React.FC<NavbarLoggedInMenuProps> = ({ avatar, nickname }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <Typography fontWeight={600} sx={{ display: { xs: 'none', md: 'block' } }}>{nickname}</Typography>
      <Avatar
        alt="user-avatar"
        src={avatar}
        sx={{
          height: 50,
          width: 50,
          '&:hover': {
            cursor: 'pointer',
          },
        }}
        onClick={() => navigate('/profile')}
      />
    </Box>
  );
};

export default NavbarLoggedInMenu;

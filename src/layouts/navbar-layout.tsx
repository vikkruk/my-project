import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../partials/navbar';

const NavbarLayout: React.FC = () => (
  <>
    <NavBar />
    <Box sx={{ height: { xs: 58, md: 64 } }} />
    <Outlet />
  </>
);

export default NavbarLayout;

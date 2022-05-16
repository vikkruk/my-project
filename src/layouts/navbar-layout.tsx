import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../partials/navbar';

const NavbarLayout: React.FC = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

export default NavbarLayout;

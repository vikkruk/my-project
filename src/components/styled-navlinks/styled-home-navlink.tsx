import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material';

const StyledHomeNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.common.white,
  transition: 'all 0.3s ease-in-out',
  m: 0,

  '&:hover': {
    color: theme.palette.secondary.main,
    transform: 'scaleX(1.1)',
  },

  '&.active': {
    color: theme.palette.secondary.main,
  },
}));

export default StyledHomeNavLink;

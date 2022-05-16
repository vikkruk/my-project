import { styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

const StyledHomeNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.common.white,
  transition: 'all 0.3s ease-in-out',

  '&:hover': {
    color: theme.palette.themeLightColor.main,
    transform: 'scaleX(1.1)',
  },
}));

export default StyledHomeNavLink;

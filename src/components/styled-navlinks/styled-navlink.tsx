import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: 'none',
  transition: 'all 0.3s ease-in-out',
  position: 'relative',
  lineHeight: '50px',

  '&:hover': {
    color: theme.palette.secondary.main,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: '0px',
    left: 0,
    height: '5px',
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    opacity: 0,
    transition: 'all 0.3s',
  },

  '&.active::before': {
    opacity: 1,
  },
}));

export default StyledNavLink;

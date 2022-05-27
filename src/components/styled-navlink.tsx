import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: 'none',
  padding: theme.spacing(2.9, 2),
  transition: 'all 0.3s ease-in-out',

  '&:hover': {
    color: theme.palette.secondary.main,
  },

  '&.active': {
    boxShadow: `inset 0 -4px 1px 0 ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.info.main,
    borderRadius: 10,
  },
}));

export default StyledNavLink;

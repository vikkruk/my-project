import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material';

const HomePageStyledLoginNavlink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  transition: 'all 0.3s ease-in-out',
  position: 'absolute',
  [theme.breakpoints.up('xs')]: {
    fontSize: 60,
  },
   [theme.breakpoints.up('sm')]: {
    fontSize: 80,
  },
   [theme.breakpoints.up('lg')]: {
    fontSize: 100,
  },
  lineHeight: '50px',

  '&:hover': {
    color: theme.palette.common.black,
    transform: 'scale(1.1)',
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

}));

export default HomePageStyledLoginNavlink;

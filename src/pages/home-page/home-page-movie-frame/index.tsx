import React from 'react';
import { Box } from '@mui/material';
import HomePageMovieFrameImage from './home-page-movie-frame-image';
import HomePageStyledLoginNavlink from '../home-page-styled-login-navlink';
import movieFrame from './images/movie-frame.png';
import { useRootSelector } from '../../../store/hooks';
import { selectAuthLoggedIn } from '../../../store/features/auth/auth-selectors';

const HomePageMovieFrame: React.FC = () => {
  const loggedIn = useRootSelector(selectAuthLoggedIn);

  return (
    <Box sx={{
      display: 'flex',
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      width: {
        xs: 295,
        sm: 550,
        md: 700,
        lg: 740,
      },
      height: {
        xs: 210,
        sm: 380,
        md: 480,
        lg: 500,
      },
      mx: 'auto',
      mt: 7,
    }}
    >
      <Box
        component="img"
        src={movieFrame}
        sx={{
          display: 'block',
          position: 'absolute',
          width: {
            xs: '100%',
          },
          height: {
            xs: 'auto',
          },
        }}
      />
      {loggedIn
        ? (
          <HomePageMovieFrameImage />
        )
        : (<HomePageStyledLoginNavlink to="/auth/login">Login</HomePageStyledLoginNavlink>)}
    </Box>
  );
};

export default HomePageMovieFrame;

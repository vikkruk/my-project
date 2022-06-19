import React from 'react';
import { Box } from '@mui/material';
import movieFrame from './images/movie-frame.png';

const HomePageMovieFrame: React.FC = () => (
  <Box sx={{
    position: 'relative',
    display: 'block',
      width: {
        xs: 295,
        sm: 550,
        md: 700,
        lg: 740,
      },
      height: { xs: 'auto' },
      mx: 'auto',
      mt: 3,
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
    <Box
      sx={{
      position: 'absolute',
      display: 'block',
      backgroundImage: 'url(https://footeandfriendsonfilm.com/wp-content/uploads/2020/02/The-Godfather-I.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
      top: {
        xs: 16,
        sm: 30,
        md: 35,
        lg: 42,
      },
      left: {
        xs: 14,
        sm: 26,
        md: 33,
        lg: 35,
      },
      width: {
        xs: 268,
        sm: 500,
        md: 640,
        lg: 680,
      },
      height: {
        xs: 190,
        sm: 350,
        md: 450,
        lg: 475,
      },
    }}
    />
  </Box>
  );

export default HomePageMovieFrame;

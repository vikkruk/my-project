import React from 'react';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';
import MovieImg from './images/movie.svg';

const HomePageHeader: React.FC = () => (
  <Container sx={{
    textAlign: 'center',
    mb: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  }}
  >
    <Typography
      component="h1"
      variant="h3"
      sx={(theme) => ({
        my: 2,
        color: theme.palette.primary.main,
        fontWeight: 900,
      })}
    >
      Generic Movies Website

    </Typography>
    <Box component="img" src={MovieImg} sx={{ height: 200 }} />

  </Container>
);

export default HomePageHeader;

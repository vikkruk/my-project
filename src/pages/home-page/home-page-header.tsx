import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import MovieImg from './images/movie.svg';

const HomePageHeader: React.FC = () => (
  <Container sx={{
    textAlign: 'center', mb: 2, display: 'flex', flexDirection: 'column', gap: 3,
  }}
  >
    <Typography
      component="h1"
      variant="h3"
      sx={(theme) => ({ my: 2, color: theme.palette.primary.main })}
    >
      Do you like to watch movies and burn your life away?

    </Typography>
    <Box component="img" src={MovieImg} sx={{ height: 200 }} />
    <Typography
      component="h2"
      variant="h4"
      sx={(theme) => ({ color: theme.palette.info.main })}
    >
      This just might be the place for you!

    </Typography>

  </Container>
);

export default HomePageHeader;

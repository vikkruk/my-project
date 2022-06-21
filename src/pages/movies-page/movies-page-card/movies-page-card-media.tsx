import React from 'react';
import { Box, CardMedia } from '@mui/material';

type MoviesPageCardMediaProps = {
  poster: string,
};

const MoviesPageCardMedia: React.FC<MoviesPageCardMediaProps> = ({ poster }) => (
  <CardMedia>
    <Box
      component="img"
      sx={{
        width: {
          xs: '100%',
          sm: 500,
          md: 500,
          lg: 500,
          xl: 500,
        },
        height: '100%',
        objectFit: 'cover',
        borderRadius: 1,
        justifySelf: 'flex-start',
      }}
      src={poster}
    />
  </CardMedia>
);

export default MoviesPageCardMedia;

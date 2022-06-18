import { Box, Typography } from '@mui/material';
import React from 'react';
import { Artist } from '../../../types';

type MoviesPageCardArtistsSectionProps = {
  artistRole: 'director' | 'actor',
  artistsCollection: Artist[],
  height: number,
  width: number,
};

const MoviesPageCardArtistsSection: React.FC<MoviesPageCardArtistsSectionProps> = ({
 artistRole, artistsCollection, height, width,
}) => {
  const artistHeader = `${artistRole.toUpperCase().slice(0, 1)}${artistRole.slice(1)}`;
  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        variant="h5"
        color="primary"
        sx={{
        mb: 2,
        fontWeight: 600,
      }}
      >
        {artistsCollection.length > 1 ? `${artistHeader}s` : artistHeader}
      </Typography>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 1,
       }}
      >
        {artistsCollection.map((artist) => (
          <Box
            component="img"
            src={artist.img}
            sx={{
            height: { height },
            width: { width },
            objectFit: 'cover',
}}
            key={artist.id}
          />
         ))}
      </Box>
    </Box>
  );
};

export default MoviesPageCardArtistsSection;

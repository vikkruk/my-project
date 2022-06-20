import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import PersonCard from '../../components/person-card';
import FilterButton from '../../components/buttons/filter-button';
import { Artist } from '../../types';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { selectAuthLoggedIn, selectAuthToken } from '../../store/features/auth/auth-selectors';
import { createArtistsFetchFavoredActionThunk, createArtistsFetchActionThunk } from '../../store/features/artists/artists-action-creators';
import { selectArtistsDirectorsAll, selectArtistsDirectorsFavored } from '../../store/features/artists/artists-selectors';
import BackToTopButton from '../../components/buttons/back-to-top-button';
import ArtistsPagesFilter from '../../components/artists-pages-filter';

const DirectorsPage: React.FC = () => {
  const dispatch = useRootDispatch();
  const allDirectors = useRootSelector(selectArtistsDirectorsAll);
  const loggedIn = useRootSelector(selectAuthLoggedIn);
  const token = useRootSelector(selectAuthToken);
  const [gender, setGender] = useState<string | undefined>(undefined);
  const favoredDirectors = useRootSelector(selectArtistsDirectorsFavored);
  const [directors, setDirectors] = useState<Artist[]>(allDirectors);
  const [showFavored, setShowFavored] = useState<boolean>(false);

  const type = 'director';

  useEffect(() => {
    dispatch(createArtistsFetchActionThunk(type, gender));
    if (loggedIn && token) {
      dispatch(createArtistsFetchFavoredActionThunk(type, token, gender));
    }
  }, [gender]);

  useEffect(() => {
    if (showFavored) {
      setDirectors(favoredDirectors);
    } else {
      setDirectors(allDirectors);
    }
  }, [showFavored, favoredDirectors, allDirectors]);

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          mb: 2,
          gap: 1,
        }}
      >
        <FilterButton title="All" onClick={() => setShowFavored(false)} />
        <FilterButton
          title="My favorite directors"
          onClick={() => setShowFavored(true)}
          loggedIn={!loggedIn}
        />
      </Box>
      <ArtistsPagesFilter handleChange={setGender} />
      <Grid
        container
        spacing={2}
        sx={{
          textAlign: 'center',
          justifyContent: { xs: 'center', md: 'flex-start' },
        }}
      >
        {directors ? directors.map((directorProps) => (
          <Grid
            key={directorProps.id}
            item
            sm={6}
            md={4}
            lg={3}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <PersonCard {...directorProps} profile={false} type="director" />
          </Grid>
        ))
          : (
            <Typography
              component="h3"
              variant="h5"
              sx={{ m: 'auto', mt: 3 }}
            >
              You have no favorite directors
            </Typography>
          )}
      </Grid>
      <BackToTopButton />
    </Container>
  );
};

export default DirectorsPage;

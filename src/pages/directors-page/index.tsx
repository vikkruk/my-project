import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import PersonCard from '../../components/person-card';
import FilterButton from '../../components/filter-button';
import { Artist } from '../../types';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { selectAuthLoggedIn, selectAuthToken } from '../../store/features/auth/auth-selectors';
import { artistsFetchFavoredActionThunk, artistsFetchActionThunk } from '../../store/features/artists/artists-action-creators';
import { selectDirectorsAll, selectDirectorsFavored } from '../../store/features/artists/artists-selectors';

const DirectorsPage: React.FC = () => {
  const dispatch = useRootDispatch();
  const allDirectors = useRootSelector(selectDirectorsAll);
  const loggedIn = useRootSelector(selectAuthLoggedIn);
  const token = useRootSelector(selectAuthToken);
  const favoredDirectors = useRootSelector(selectDirectorsFavored);
  const [directors, setDirectors] = useState<Artist[]>(allDirectors);
  const [showFavored, setShowFavored] = useState<boolean>(false);

  const type = 'director';

  useEffect(() => {
    dispatch(artistsFetchActionThunk(type));
  }, []);

  useEffect(() => {
 if (loggedIn && token) {
      dispatch(artistsFetchFavoredActionThunk(type, token));
    }
  }, [favoredDirectors]);

  useEffect(() => {
    if (showFavored) {
      setDirectors(favoredDirectors);
    } else {
      setDirectors(allDirectors);
    }
  }, [showFavored, allDirectors]);

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
    </Container>
  );
};

export default DirectorsPage;

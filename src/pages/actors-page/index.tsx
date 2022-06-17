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
import { selectActorsAll, selectActorsFavored } from '../../store/features/artists/artists-selectors';

const ActorsPage: React.FC = () => {
  const dispatch = useRootDispatch();
  const token = useRootSelector(selectAuthToken);
  const loggedIn = useRootSelector(selectAuthLoggedIn);
  const allActors = useRootSelector(selectActorsAll);
  const favoredActors = useRootSelector(selectActorsFavored);
  const [actors, setActors] = useState<Artist[]>(allActors);
  const [showFavored, setShowFavored] = useState<boolean>(false);

  useEffect(() => {
    dispatch(artistsFetchActionThunk('actor'));
  }, []);

  useEffect(() => {
   if (loggedIn && token) {
      dispatch(artistsFetchFavoredActionThunk('actor', token));
    }
  }, [favoredActors]);

  useEffect(() => {
    if (showFavored) {
      setActors(favoredActors);
    } else {
      setActors(allActors);
    }
  }, [showFavored, allActors, favoredActors]);

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
          title="My favorite actors"
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
        {actors ? actors.map((actorProps) => (
          <Grid
            key={actorProps.id}
            item
            sm={6}
            md={4}
            lg={3}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <PersonCard {...actorProps} profile={false} type="actor" />
          </Grid>
        ))
          : (
            <Typography
              component="h3"
              variant="h5"
              sx={{ m: 'auto', mt: 3 }}
            >
              You have no favorite actors
            </Typography>
          )}
      </Grid>
    </Container>
  );
};

export default ActorsPage;

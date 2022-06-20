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
import { selectArtistsActorsAll, selectArtistsActorsFavored } from '../../store/features/artists/artists-selectors';
import BackToTopButton from '../../components/buttons/back-to-top-button';
import ArtistsPagesFilter from '../../components/artists-pages-filter';

const ActorsPage: React.FC = () => {
  const dispatch = useRootDispatch();
  const token = useRootSelector(selectAuthToken);
  const loggedIn = useRootSelector(selectAuthLoggedIn);
  const allActors = useRootSelector(selectArtistsActorsAll);
  const [gender, setGender] = useState<string | undefined>(undefined);
  const [actors, setActors] = useState<Artist[]>(allActors);
  const favoredActors = useRootSelector(selectArtistsActorsFavored);
  const [showFavored, setShowFavored] = useState<boolean>(false);

  const type = 'actor';

  useEffect(() => {
    dispatch(createArtistsFetchActionThunk(type, gender));
    if (loggedIn && token) {
      dispatch(createArtistsFetchFavoredActionThunk(type, token, gender));
    }
  }, [gender]);

  useEffect(() => {
    if (showFavored) {
      setActors(favoredActors);
    } else {
      setActors(allActors);
    }
  }, [showFavored, favoredActors, allActors]);

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
      <ArtistsPagesFilter handleChange={setGender} />
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
      <BackToTopButton />
    </Container>
  );
};

export default ActorsPage;

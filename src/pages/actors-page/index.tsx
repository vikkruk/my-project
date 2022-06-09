import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import ActorsPageCard from './actors-page-card';
import { Artist, User } from '../../types';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { actorsFetchFavoredAction, actorsFetchAction } from '../../store/features/actors/actors-action-creators';
import { selectActorsAll, selectActorsFavored } from '../../store/features/actors/actors-selectors';
import { selectAuthLoggedIn } from '../../store/features/auth/auth-selectors';
import { getLocalStorage, setLocalStorage } from '../../helpers/local-storage-helpers';
import ApiService from '../../services/api-service';
import ActorsPageFilterButton from './actors-page-filter-button';

const USER_KEY_IN_LOCAL_STORAGE = process.env.REACT_APP_USER_KEY_IN_LOCAL_STORAGE;

const ActorsPage: React.FC = () => {
  const dispatch = useRootDispatch();
  const allActors = useRootSelector(selectActorsAll);
  const loggedIn = useRootSelector(selectAuthLoggedIn);
  const favoredActorsIds = useRootSelector(selectActorsFavored);
  const [actors, setActors] = useState<Artist[]>(allActors);
  const [showFavored, setShowFavored] = useState<boolean>(false);

  useEffect(() => {
    dispatch(actorsFetchAction);
    if (loggedIn) {
      dispatch(actorsFetchFavoredAction);
    }
  }, [loggedIn]);

  useEffect(() => {
    const currentUser = getLocalStorage<User>(USER_KEY_IN_LOCAL_STORAGE);
    if (loggedIn) {
      setLocalStorage(USER_KEY_IN_LOCAL_STORAGE, {
        ...currentUser,
        favoredActors: favoredActorsIds,
      });
      if (currentUser !== null) {
        ApiService.patch(`users/${currentUser.id}`, {
          favoredActors: favoredActorsIds,
        });
      }
    }

    if (showFavored) {
      const favoredActors = favoredActorsIds.map((fav) => {
        const favActorData = allActors.find((actor) => actor.id === fav.actorId);
        if (favActorData !== undefined) { return favActorData; }
        return null;
      }).filter((x) => x) as Artist[];
      setActors(favoredActors);
    } else {
      setActors(allActors);
    }
  }, [showFavored, allActors, favoredActorsIds]);

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
        <ActorsPageFilterButton title="All" onClick={() => setShowFavored(false)} />
        <ActorsPageFilterButton
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
            <ActorsPageCard {...actorProps} profile={false} />
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

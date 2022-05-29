import React, { useEffect, useState } from 'react';
import {
  Box, Container, Grid, Paper, Typography,
} from '@mui/material';
import { selectAuthUser } from '../../store/features/auth/auth-selectors';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { selectActorsFavored, selectActorsAll } from '../../store/features/actors/actors-selectors';
import ActorsPageCard from '../actors-page/actors-page-card';
import { Actor } from '../../types';
import { actorsFetchAction, actorsFetchFavoredAction } from '../../store/features/actors/actors-action-creators';

const ProfilePage: React.FC = () => {
  const [favoredActors, setFavoredActors] = useState<Actor[]>([]);
  const dispatch = useRootDispatch();
  const user = useRootSelector(selectAuthUser);
  const actors = useRootSelector(selectActorsAll);
  const favored = useRootSelector(selectActorsFavored);

  useEffect(() => {
    (async () => {
      await dispatch(actorsFetchAction);
      await dispatch(actorsFetchFavoredAction);
    })();
  }, []);

  useEffect(() => {
    const favActors = favored.map((fav) => {
      const favActorData = actors.find((actor) => actor.id === fav.actorId);
      if (favActorData !== undefined) { return favActorData; }
      return null;
    }).filter((x) => x) as Actor[];
    setFavoredActors(favActors);
  }, [favored]);

  return (
    <Container>
      <Paper sx={{
        my: 2,
        p: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        <Box
          component="img"
          src={user?.avatar}
          sx={{
            width: 200,
            height: 200,
            m: 2,
            objectFit: 'cover',
            borderRadius: '100%',
          }}
        />
        <Typography
          variant="h5"
          sx={{
            m: 5,
          }}
        >
          {user?.nickname || user?.email}
        </Typography>

        <Box>
          <Typography variant="h5" fontWeight={600}>
            My Favorite Actors:
          </Typography>
          <Grid
            container
            sx={{
              textAlign: 'center',
              justifyContent: { xs: 'center' },
              width: '100%',
              display: 'flex',
              gap: 3,
              m: 'auto',
            }}
          >
            {favoredActors ? favoredActors.map((actorProps) => (
              <Grid
                key={actorProps.id}
                item
                sm={6}
                md={4}
                lg={3}
                sx={{
                  display: 'flex', justifyContent: 'center', transform: 'scale(0.8)',
                }}
              >
                <ActorsPageCard {...actorProps} />
              </Grid>
            ))
              : (<Typography component="h1" variant="h1">No actors in the database</Typography>)}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;

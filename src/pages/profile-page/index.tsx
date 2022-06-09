import React, { useEffect, useState } from 'react';
import {
  Box, Container, Grid, Paper, Typography,
} from '@mui/material';
import { selectAuthUser } from '../../store/features/auth/auth-selectors';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { selectActorsFavored, selectActorsAll } from '../../store/features/actors/actors-selectors';
import ActorsPageCard from '../actors-page/actors-page-card';
import { Artist } from '../../types';
import { actorsFetchAction, actorsFetchFavoredAction } from '../../store/features/actors/actors-action-creators';

const ProfilePage: React.FC = () => {
  const [favoredActors, setFavoredActors] = useState<Artist[]>([]);
  const dispatch = useRootDispatch();
  const user = useRootSelector(selectAuthUser);
  const actors = useRootSelector(selectActorsAll);
  const favoredActorsIds = useRootSelector(selectActorsFavored);

  useEffect(() => {
    (async () => {
      await dispatch(actorsFetchAction);
      await dispatch(actorsFetchFavoredAction);
    })();
  }, []);

  useEffect(() => {
    const favActors = favoredActorsIds.map((fav) => {
      const favActorData = actors.find((actor) => actor.id === fav.actorId);
      if (favActorData !== undefined) { return favActorData; }
      return null;
    }).filter((x) => x) as Artist[];
    setFavoredActors(favActors);
  }, [favoredActorsIds]);

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

        <Box sx={{ width: '100%' }}>
          <Typography variant="h5" fontWeight={600}>
            My Favorite Actors:
          </Typography>
          <Grid
            container
            sx={{
              textAlign: 'center',
              justifyContent: { xs: 'center', md: 'flex-start' },
              m: 'auto',
              gap: { xl: 5 },
            }}
          >
            {favoredActors.length > 0 ? favoredActors.map((actorProps) => (
              <Grid
                key={actorProps.id}
                item
                xs={12}
                sm={6}
                md={3}
                xl={2}
                sx={{
                  transform: 'scale(0.7)',
                  height: 300,
                }}
              >
                <ActorsPageCard {...actorProps} profile />
              </Grid>
            ))
              : (<Typography component="h3" variant="h5">You have no favorite actors</Typography>)}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;

import React, { useEffect, useState } from 'react';
import {
  Box, Button, Container, Grid, Typography,
} from '@mui/material';

import ActorsPageCard from './actors-page-card';
import { Actor } from '../../types';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { actorsFetchAction } from '../../store/features/actors/actors-action-creators';
import { selectActorsAll, selectActorsFavored } from '../../store/features/actors/actors-selectors';

const ActorsPage: React.FC = () => {
  const dispatch = useRootDispatch();
  const allActors = useRootSelector(selectActorsAll);
  const favoredActorsIds = useRootSelector(selectActorsFavored);
  const [actors, setActors] = useState<Actor[]>(allActors);
  const [showFavored, setShowFavored] = useState<boolean>(false);

  useEffect(() => {
    dispatch(actorsFetchAction);
    console.log(process.env.REACT_APP_API_SERVER);
  }, []);

  useEffect(() => {
    if (showFavored) {
      const favoredActors = favoredActorsIds.map((fav) => {
        const favActorData = allActors.find((actor) => actor.id === fav.id);
        if (favActorData !== undefined) { return favActorData; }
        return null;
      }).filter((x) => x) as Actor[];
      setActors(favoredActors);
    } else {
      setActors(allActors);
    }
  }, [showFavored, allActors, favoredActorsIds]);

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{
        width: '100%', display: 'flex', justifyContent: 'center', mb: 2, gap: 1,
      }}
      >
        <Button
          variant="contained"
          sx={(theme) => ({
            ':hover': {
              bgcolor: theme.palette.info.main,
            },
          })}
          onClick={() => setShowFavored(false)}
        >
          All

        </Button>
        <Button
          variant="contained"
          sx={(theme) => ({
            ':hover': {
              bgcolor: theme.palette.info.main,
            },
          })}
          onClick={() => setShowFavored(true)}
        >
          My favorite actors

        </Button>
      </Box>
      <Grid container spacing={2} sx={{ textAlign: 'center' }}>
        {actors ? actors.map((actorProps) => (
          <Grid key={actorProps.id} item sm={4}>
            <ActorsPageCard {...actorProps} />
          </Grid>
        ))
          : (<Typography component="h1" variant="h1">No dassssssssssssssssssssss</Typography>)}
      </Grid>
    </Container>
  );
};

export default ActorsPage;

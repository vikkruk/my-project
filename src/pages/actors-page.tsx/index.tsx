import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  Box, Button, Container, Grid, Typography,
} from '@mui/material';

import ActorsPageCard from './actors-page-card';
import { Actor } from '../../types';
import useRootSelector from '../../store/hooks';

const ActorsPage: React.FC = () => {
  // const [actors, setActors] = useState<Actor[]>([]);

  // useEffect(() => {
  //   axios.get<Actor[]>('http://localhost:8000/actors')
  //     .then((response) => setActors(response.data))
  //     .catch((error) => { throw new Error(error); });
  // }, []);

  const allActors = useRootSelector((state) => state.actors);
  const favored = useRootSelector((state) => state.favored);
  const [actors, setActors] = useState<Actor[] | null>(allActors);

  const favoredActors = favored.map((fav) => {
    const favActorData = allActors.find((actor) => actor.id === fav.id);
    if (favActorData !== undefined) { return favActorData; }
    return null;
  });

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
              bgcolor: theme.palette.themeGreyColor.main,
            },
          })}
          onClick={() => setActors(allActors)}
        >
          All

        </Button>
        <Button
          variant="contained"
          sx={(theme) => ({
            ':hover': {
              bgcolor: theme.palette.themeGreyColor.main,
            },
          })}
          onClick={() => setActors(favoredActors as Actor[])}
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

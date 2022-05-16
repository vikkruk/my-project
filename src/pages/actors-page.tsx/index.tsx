import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid } from '@mui/material';

import ActorsPageCard from './actors-page-card';
import { Actor } from '../../types';

const ActorsPage: React.FC = () => {
  const [actors, setActors] = useState<Actor[]>([]);

  useEffect(() => {
    axios.get<Actor[]>('http://localhost:8000/actors')
      .then((response) => setActors(response.data))
      .catch((error) => { throw new Error(error); });
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={2} sx={{ textAlign: 'center' }}>
        {actors.map(({ id, ...actorProps }) => (
          <Grid key={id} item sm={4}>
            <ActorsPageCard {...actorProps} />
          </Grid>
        ))}
      </Grid>

    </Container>
  );
};

export default ActorsPage;

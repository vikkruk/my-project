import React from 'react';
import { Box, Paper } from '@mui/material';

import { Actor } from '../../types';

type ActorsPageCardProps = Omit<Actor, 'gender' | 'id'>;

const ActorsPageCard: React.FC<ActorsPageCardProps> = ({
  name, surname, img,
}) => (

  <Paper sx={(theme) => theme.mixins.paper}>
    <Box src={img} sx={(theme) => theme.mixins.image} component="img" />
    {`${name} ${surname}`}
  </Paper>
);

export default ActorsPageCard;

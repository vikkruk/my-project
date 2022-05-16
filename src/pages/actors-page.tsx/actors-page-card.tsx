import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Paper } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Actor } from '../../types';

type ActorsPageCardProps = Omit<Actor, 'gender'>;

const ActorsPageCard: React.FC<ActorsPageCardProps> = ({
  id, name, surname, img,
}) => {
  const dispatch = useDispatch();

  const addToFavored = (actorId: string): void => {
    dispatch({
      type: 'ADD_TO_FAVORED',
      payload: { actorId },
    });
  };
  return (

    <Paper sx={(theme) => theme.mixins.paper}>
      <FavoriteIcon
        color="themeLightColor"
        sx={{
          fontSize: 40,
          position: 'absolute',
          top: 5,
          right: 5,
          transition: 'transform 0.3s linear',

          ':hover': {
            transform: 'scale(1.1)',
            color: 'pink',
          },
        }}
        onClick={() => addToFavored(id)}
      />
      <Box src={img} sx={(theme) => theme.mixins.image} component="img" />
      {`${name} ${surname}`}
    </Paper>
  );
};

export default ActorsPageCard;

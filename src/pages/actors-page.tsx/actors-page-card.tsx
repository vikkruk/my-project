import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Paper } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Actor } from '../../types';
import useRootSelector from '../../store/hooks';

type ActorsPageCardProps = Omit<Actor, 'gender'> & {
  reload: () => void,
};

const ActorsPageCard: React.FC<ActorsPageCardProps> = ({
  id, name, surname, img, reload,
}) => {
  const dispatch = useDispatch();
  const favored = useRootSelector((state) => state.favored);

  const addToFavored = (actorId: string): void => {
    dispatch({
      type: 'ADD_TO_FAVORED',
      payload: { actorId },
    });
  };

  const deleteFromFavored = (actorId: string): void => {
    dispatch({
      type: 'DELETE_FROM_FAVORED',
      payload: { actorId },
    });
    reload();
  };

  const isFavored = favored.find((fav) => fav.id === id);

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
        onClick={isFavored ? () => deleteFromFavored(id)
          : () => addToFavored(id)}
      />
      <Box src={img} sx={(theme) => theme.mixins.image} component="img" />
      {`${name} ${surname}`}
    </Paper>
  );
};

export default ActorsPageCard;

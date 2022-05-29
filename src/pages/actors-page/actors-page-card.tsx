import React from 'react';
import { Box, Paper } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

import { Actor } from '../../types';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { createActorsAddFavored, createActorsDeleteFavored } from '../../store/features/actors/actors-action-creators';
import { selectActorsFavored } from '../../store/features/actors/actors-selectors';
import { selectAuthLoggedIn } from '../../store/features/auth/auth-selectors';

type ActorsPageCardProps = Omit<Actor, 'gender'>;

const ActorsPageCard: React.FC<ActorsPageCardProps> = ({
  id, name, surname, img,
}) => {
  const dispatch = useRootDispatch();
  const favored = useRootSelector(selectActorsFavored);
  const loggedIn = useRootSelector(selectAuthLoggedIn);

  const addToFavored = (actorId: string): void => {
    dispatch(createActorsAddFavored(actorId));
  };

  const deleteFromFavored = (actorId: string): void => {
    dispatch(createActorsDeleteFavored(actorId));
  };

  const isFavored = favored.find((fav) => fav.actorId === id);
  return (
    <Paper sx={(theme) => theme.mixins.paper}>

      {loggedIn
        && (isFavored
          ? (
            <HeartBrokenIcon
              color="secondary"
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
              onClick={() => deleteFromFavored(id)}
            />
          )
          : (
            <FavoriteIcon
              color="secondary"
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
          ))}

      <Box
        src={img}
        sx={(theme) => theme.mixins.image}
        component="img"
      />
      {`${name} ${surname}`}
    </Paper>
  );
};

export default ActorsPageCard;

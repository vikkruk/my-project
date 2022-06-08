import React from 'react';
import { Box, Paper } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { Artist } from '../../types';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { createActorsAddFavored, createActorsDeleteFavored } from '../../store/features/actors/actors-action-creators';
import { selectActorsFavored } from '../../store/features/actors/actors-selectors';
import { selectAuthLoggedIn } from '../../store/features/auth/auth-selectors';

type ActorsPageCardProps = Omit<Artist, 'gender'> & {
  profile: boolean
};

const heartIconStyle = {
  fontSize: 40,
  position: 'absolute',
  top: 5,
  right: 5,
  transition: 'all 0.3s linear',

  ':hover': {
    transform: 'scale(1.1)',
    color: '#BA0021',
  },
};

const ActorsPageCard: React.FC<ActorsPageCardProps> = ({
  id, name, surname, img, profile,
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

      {(loggedIn && !profile)
        && (isFavored
          ? (
            <HeartBrokenIcon
              color="secondary"
              sx={{
                ...heartIconStyle,
              }}
              onClick={() => deleteFromFavored(id)}
            />
          )
          : (
            <FavoriteIcon
              color="secondary"
              sx={{
                ...heartIconStyle,
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

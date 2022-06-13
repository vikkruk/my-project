import React from 'react';
import { Box, Paper } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { Artist } from '../types';
import { useRootDispatch, useRootSelector } from '../store/hooks';
import { createArtistsAddFavored, createArtistsDeleteFavored } from '../store/features/artists/artists-action-creators';
import { selectActorsFavored, selectDirectorsFavored } from '../store/features/artists/artists-selectors';
import { selectAuthLoggedIn } from '../store/features/auth/auth-selectors';
import { ArtistsPageType } from '../store/features/artists/artists-types';

type PersonCardProps = Omit<Artist, 'gender'> & {
  profile: boolean
  type: ArtistsPageType,
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

const PersonCard: React.FC<PersonCardProps> = ({
  id, name, surname, img, profile, type,
}) => {
  const dispatch = useRootDispatch();
  const favored = type === 'actor' ? useRootSelector(selectActorsFavored) : useRootSelector(selectDirectorsFavored);
  const loggedIn = useRootSelector(selectAuthLoggedIn);
  const addToFavored = (artistId: string): void => {
    dispatch(createArtistsAddFavored(artistId, type));
  };

  const deleteFromFavored = (artistId: string): void => {
    dispatch(createArtistsDeleteFavored(artistId, type));
  };

  const isFavored = favored.find((fav) => fav.artistId === id);
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

export default PersonCard;

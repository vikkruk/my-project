import React, { useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Artist } from '../types';
import { ArtistsPageType } from '../store/features/artists/artists-types';
import { useRootDispatch, useRootSelector } from '../store/hooks';
import {
  createArtistsAddFavoredThunk,
  createArtistsDeleteActionThunk,
  createArtistsFetchActionThunk,
  createArtistsFetchFavoredActionThunk,
  createArtistsRemoveFavoredThunk,
} from '../store/features/artists/artists-action-creators';
import {
  selectArtistsActorsFavored, selectArtistsDirectorsFavored, selectArtistsActorsAll, selectArtistsDirectorsAll,
} from '../store/features/artists/artists-selectors';
import {
  selectAuthLoggedIn,
  selectAuthRole,
  selectAuthToken,
} from '../store/features/auth/auth-selectors';

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
    cursor: 'pointer',
  },
};

const PersonCard: React.FC<PersonCardProps> = ({
  id,
  name,
  surname,
  img,
  profile,
  type,
}) => {
  const dispatch = useRootDispatch();
  const favored = type === 'actor' ? useRootSelector(selectArtistsActorsFavored) : useRootSelector(selectArtistsDirectorsFavored);
  const loggedIn = useRootSelector(selectAuthLoggedIn);
  const token = useRootSelector(selectAuthToken);
  const role = useRootSelector(selectAuthRole);
  const artists = type === 'actor' ? useRootSelector(selectArtistsActorsAll) : useRootSelector(selectArtistsDirectorsAll);

  const addToFavored = async (artistId: string): Promise<void> => {
    if (token) {
      await dispatch(createArtistsAddFavoredThunk(artistId, type, token));
      await dispatch(createArtistsFetchFavoredActionThunk(type, token));
    }
  };

  const deleteFromFavored = async (artistId: string): Promise<void> => {
    if (token) {
      await dispatch(createArtistsRemoveFavoredThunk(artistId, type, token));
      await dispatch(createArtistsFetchFavoredActionThunk(type, token));
    }
  };

  const deleteArtist = async (artistId: string): Promise<void> => {
    if (token && role === 'admin') {
      await dispatch(createArtistsDeleteActionThunk(artistId, token));
      await dispatch(createArtistsFetchActionThunk(type));
    }
  };

  const isFavored = favored.find((fav) => fav.id === id);

  useEffect(() => {

  }, [artists]);

  return (
    <Paper sx={(theme) => theme.mixins.paper}>

      {(loggedIn && !profile)
        && (isFavored
          ? (
            <FavoriteIcon
              color="error"
              sx={{
                color: '#BA0021',
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
      {role === 'admin' && !profile
        ? (
          <DeleteForeverIcon
            color="error"
            sx={{
              fontSize: 40,
              position: 'absolute',
              bottom: 45,
              right: 0,
              transition: 'all 0.3s linear',

              ':hover': {
                transform: 'scale(1.1)',
                color: '#BA0021',
                cursor: 'pointer',
              },
            }}
            onClick={() => deleteArtist(id)}
          />
        )
        : null}

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

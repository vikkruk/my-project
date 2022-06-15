import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import PersonCard from '../../components/person-card';
import FilterButton from '../../components/filter-button';
import { Artist, User } from '../../types';
import ApiService from '../../services/api-service';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { selectAuthLoggedIn } from '../../store/features/auth/auth-selectors';
import { artistsFetchFavoredActionThunk, artistsFetchActionThunk } from '../../store/features/artists/artists-action-creators';
import { selectDirectorsAll, selectDirectorsFavored } from '../../store/features/artists/artists-selectors';
import { getLocalStorage, setLocalStorage } from '../../helpers/local-storage-helpers';

const USER_KEY_IN_LOCAL_STORAGE = process.env.REACT_APP_USER_KEY_IN_LOCAL_STORAGE;
if (USER_KEY_IN_LOCAL_STORAGE === undefined) {
  throw new Error('Please declare REACT_APP_USER_KEY_IN_LOCAL_STORAGE in/.env');
}

const DirectorsPage: React.FC = () => {
  const dispatch = useRootDispatch();
  const allDirectors = useRootSelector(selectDirectorsAll);
  const loggedIn = useRootSelector(selectAuthLoggedIn);
  const favoredDirectorsIds = useRootSelector(selectDirectorsFavored);
  const [directors, setDirectors] = useState<Artist[]>(allDirectors);
  const [showFavored, setShowFavored] = useState<boolean>(false);

  const type = 'director';

  useEffect(() => {
    dispatch(artistsFetchActionThunk(type));
    if (loggedIn) {
      dispatch(artistsFetchFavoredActionThunk(type));
    }
  }, [loggedIn]);

  useEffect(() => {
    const currentUser = getLocalStorage<User>(USER_KEY_IN_LOCAL_STORAGE);
    if (loggedIn && currentUser) {
      setLocalStorage(USER_KEY_IN_LOCAL_STORAGE, {
        ...currentUser,
        favored: {
          ...currentUser.favored,
          directors: favoredDirectorsIds,
        },
      });
      if (currentUser !== null) {
        ApiService.patch(`users/${currentUser.id}`, {
          favored: {
            ...currentUser.favored,
            directors: favoredDirectorsIds,
          },

        });
      }
    }

    if (showFavored) {
      const favoredDirectors = favoredDirectorsIds.map((fav) => {
        const favDirectorData = allDirectors.find((director) => director.id === fav.artistId);
        if (favDirectorData !== undefined) { return favDirectorData; }
        return null;
      }).filter((x) => x) as Artist[];
      setDirectors(favoredDirectors);
    } else {
      setDirectors(allDirectors);
    }
  }, [showFavored, allDirectors, favoredDirectorsIds]);

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          mb: 2,
          gap: 1,
        }}
      >
        <FilterButton title="All" onClick={() => setShowFavored(false)} />
        <FilterButton
          title="My favorite directors"
          onClick={() => setShowFavored(true)}
          loggedIn={!loggedIn}
        />
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          textAlign: 'center',
          justifyContent: { xs: 'center', md: 'flex-start' },
        }}
      >
        {directors ? directors.map((directorProps) => (
          <Grid
            key={directorProps.id}
            item
            sm={6}
            md={4}
            lg={3}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <PersonCard {...directorProps} profile={false} type="director" />
          </Grid>
        ))
          : (
            <Typography
              component="h3"
              variant="h5"
              sx={{ m: 'auto', mt: 3 }}
            >
              You have no favorite directors
            </Typography>
          )}
      </Grid>
    </Container>
  );
};

export default DirectorsPage;

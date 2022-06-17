import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import PersonCard from '../../components/person-card';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { createArtistsFetchFavoredActionThunk } from '../../store/features/artists/artists-action-creators';
import { selectAuth } from '../../store/features/auth/auth-selectors';
import { selectArtistsActorsFavored, selectArtistsDirectorsFavored } from '../../store/features/artists/artists-selectors';

const ProfilePage: React.FC = () => {
  const dispatch = useRootDispatch();
  const { user, token } = useRootSelector(selectAuth);
  const favoredActors = useRootSelector(selectArtistsActorsFavored);
  const favoredDirectors = useRootSelector(selectArtistsDirectorsFavored);
  useEffect(() => {
    (async () => {
      if (token) {
        await dispatch(createArtistsFetchFavoredActionThunk('actor', token));
        await dispatch(createArtistsFetchFavoredActionThunk('director', token));
      }
    })();
  }, []);

  return (
    <Container>
      <Paper sx={{
        my: 2,
        p: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        <Box
          component="img"
          src={user?.avatar ?? '/no-avatar.png'}
          sx={{
            width: 150,
            height: 150,
            m: 2,
            objectFit: 'cover',
            borderRadius: '100%',
          }}
        />
        <Typography
          variant="h5"
          sx={{
            mt: 1,
            mb: 4,
            fontWeight: 600,
          }}
        >
          {user?.nickname || user?.email}
        </Typography>

        <Box sx={{ width: '100%' }}>
          <Typography
            variant="h5"
            fontWeight={600}
            sx={{ mb: 1 }}
          >
            My Favorite Actors:
          </Typography>
          <Grid
            container
            sx={{
              textAlign: 'center',
              justifyContent: { xs: 'center', sm: 'flex-start' },
              m: 'auto',
              gap: { sm: 5 },
            }}
          >
            {favoredActors.length > 0 ? favoredActors.map((favoredActor) => (
              <Box
                key={favoredActor.id}
                sx={{
                transform: { xs: 'scale(0.9)', sm: 'scale(1)' },
              }}
              >
                <PersonCard {...favoredActor} profile type="actor" />
              </Box>
            ))
              : (<Typography component="h3" variant="h5">You have no favorite actors</Typography>)}
          </Grid>
        </Box>
        <Box sx={{ width: '100%', mt: 6 }}>
          <Typography
            variant="h5"
            fontWeight={600}
            sx={{ mb: 1 }}
          >
            My Favorite Directors:
          </Typography>
          <Grid
            container
            sx={{
              textAlign: 'center',
              justifyContent: { xs: 'center', sm: 'flex-start' },
              m: 'auto',
              gap: { sm: 5 },
            }}
          >
            {favoredDirectors.length > 0 ? favoredDirectors.map((favDirector) => (
              <Box
                key={favDirector.id}
                sx={{
                transform: { xs: 'scale(0.9)', sm: 'scale(1)' },
              }}
              >
                <PersonCard {...favDirector} profile type="director" />
              </Box>
            ))
              : (<Typography component="h3" variant="h5">You have no favorite directors</Typography>)}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;

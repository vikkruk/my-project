import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import ProfilePageForm from './profile-page-form';
import PersonCard from '../../components/person-card';
import CustomDivider from '../../components/custom-divider';
import noAvatar from './images/no-avatar.png';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { createArtistsFetchFavoredActionThunk } from '../../store/features/artists/artists-action-creators';
import { selectAuth } from '../../store/features/auth/auth-selectors';
import { selectArtistsActorsFavored, selectArtistsDirectorsFavored } from '../../store/features/artists/artists-selectors';
import BackToTopButton from '../../components/buttons/back-to-top-button';

const ProfilePage: React.FC = () => {
  const dispatch = useRootDispatch();
  const { user, token } = useRootSelector(selectAuth);
  if (user === null) {
    throw new Error('You have to be logged in');
  }
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
        <CustomDivider />
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-around',
          mb: 4,
          width: '100%',
        }}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
            <Box
              component="img"
              src={user.avatar ?? noAvatar}
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
              {user.nickname}
            </Typography>
          </Box>

          <ProfilePageForm />
        </Box>
        <CustomDivider />
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
      <BackToTopButton />
    </Container>
  );
};

export default ProfilePage;

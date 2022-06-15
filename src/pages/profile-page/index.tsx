import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import PersonCard from '../../components/person-card';
import { Artist } from '../../types';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { artistsFetchActionThunk, artistsFetchFavoredActionThunk } from '../../store/features/artists/artists-action-creators';
import { selectAuthUser } from '../../store/features/auth/auth-selectors';
import {
 selectActorsFavored,
 selectActorsAll,
 selectDirectorsAll,
 selectDirectorsFavored,
} from '../../store/features/artists/artists-selectors';

const ProfilePage: React.FC = () => {
  const [favoredActors, setFavoredActors] = useState<Artist[]>([]);
  const [favoredDirectors, setFavoredDirectors] = useState<Artist[]>([]);
  const dispatch = useRootDispatch();
  const user = useRootSelector(selectAuthUser);
  const actors = useRootSelector(selectActorsAll);
  const directors = useRootSelector(selectDirectorsAll);
  const favoredActorsIds = useRootSelector(selectActorsFavored);
  const favoredDirectorsIds = useRootSelector(selectDirectorsFavored);
  useEffect(() => {
    (async () => {
      await dispatch(artistsFetchActionThunk('actor'));
      await dispatch(artistsFetchFavoredActionThunk('actor'));
      await dispatch(artistsFetchActionThunk('director'));
      await dispatch(artistsFetchFavoredActionThunk('director'));
    })();
  }, []);

  useEffect(() => {
    const favActors = favoredActorsIds.map((fav) => {
      const favActorData = actors.find((actor) => actor.id === fav.artistId);
      if (favActorData !== undefined) { return favActorData; }
      return null;
    }).filter((x) => x) as Artist[];
    setFavoredActors(favActors);
    const favDirectors = favoredDirectorsIds.map((fav) => {
      const favDirectorData = directors.find((director) => director.id === fav.artistId);
      if (favDirectorData !== undefined) { return favDirectorData; }
      return null;
    }).filter((x) => x) as Artist[];
    setFavoredDirectors(favDirectors);
  }, [favoredActorsIds, favoredDirectorsIds]);

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
          src={user?.avatar}
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
            m: 5,
          }}
        >
          {user?.nickname || user?.email}
        </Typography>

        <Box sx={{ width: '100%' }}>
          <Typography variant="h5" fontWeight={600}>
            My Favorite Actors:
          </Typography>
          <Grid
            container
            sx={{
              textAlign: 'center',
              justifyContent: { xs: 'center', md: 'flex-start' },
              m: 'auto',
              gap: { xl: 5 },
            }}
          >
            {favoredActors.length > 0 ? favoredActors.map((actorProps) => (
              <Grid
                key={actorProps.id}
                item
                xs={12}
                sm={6}
                md={3}
                xl={2}
                sx={{
                  transform: 'scale(0.7)',
                  height: 300,
                }}
              >
                <PersonCard {...actorProps} profile type="actor" />
              </Grid>
            ))
              : (<Typography component="h3" variant="h5">You have no favorite actors</Typography>)}
          </Grid>
        </Box>
        <Box sx={{ width: '100%', mt: 6 }}>
          <Typography variant="h5" fontWeight={600}>
            My Favorite Directors:
          </Typography>
          <Grid
            container
            sx={{
              textAlign: 'center',
              justifyContent: { xs: 'center', md: 'flex-start' },
              m: 'auto',
              gap: { xl: 5 },
            }}
          >
            {favoredDirectors.length > 0 ? favoredDirectors.map((directorProps) => (
              <Grid
                key={directorProps.id}
                item
                xs={12}
                sm={6}
                md={3}
                xl={2}
                sx={{
                  transform: 'scale(0.7)',
                  height: 300,
                }}
              >
                <PersonCard {...directorProps} profile type="director" />
              </Grid>
            ))
              : (<Typography component="h3" variant="h5">You have no favorite directors</Typography>)}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;

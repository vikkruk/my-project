import { LocalConvenienceStoreOutlined } from '@mui/icons-material';
import {
 Box, Grid, Paper, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import MovieCard from '../../components/movie-card';
import { moviesFetchAction } from '../../store/features/movies/movies-action-creators';
import selectMoviesAll from '../../store/features/movies/movies-selectors';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { Movie } from '../../types';

const MoviesPage: React.FC = () => {
const dispatch = useRootDispatch();
const moviesAll = useRootSelector(selectMoviesAll);
const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
      dispatch(moviesFetchAction);
    }, []);

  useEffect(() => {
    setMovies(moviesAll);
  }, [moviesAll]);
  return (
    <Box>

      <Grid
        container
        spacing={2}
        sx={{
        textAlign: 'center',
        justifyContent: { xs: 'center', md: 'flex-start' },
      }}
      >
        {movies ? movies.map((movieProps) => (
          <Grid
            item
            sx={{ width: '100%', mx: 'auto' }}
            xs={8}
            key={movieProps.id}
          >

            <MovieCard {...movieProps} />
          </Grid>
        ))
        : (
          <Typography
            component="h3"
            variant="h5"
            sx={{ m: 'auto', mt: 3 }}
          >
            You have no favorite actors
          </Typography>
          )}
      </Grid>
    </Box>
  );
};

export default MoviesPage;

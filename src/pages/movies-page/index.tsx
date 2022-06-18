import React, { useEffect, useState } from 'react';
import {
 Box,
 Grid,
 Typography,
} from '@mui/material';
import MoviesPageCard from './movies-page-card';
import { Movie } from '../../types';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { createMoviesFetchActionThunk } from '../../store/features/movies/movies-action-creators';
import selectMoviesAll from '../../store/features/movies/movies-selectors';
import MoviesPageFilter from './movies-page-filter';

const MoviesPage: React.FC = () => {
const dispatch = useRootDispatch();
const moviesAll = useRootSelector(selectMoviesAll);
const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
      dispatch(createMoviesFetchActionThunk());
    }, []);

  useEffect(() => {
    setMovies(moviesAll);
  }, [moviesAll]);

  const handleChange = (genre: string): void => {
    if (genre === 'all') {
      dispatch(createMoviesFetchActionThunk());
    }
    dispatch(createMoviesFetchActionThunk(genre));
  };

  return (
    <Box>
      <MoviesPageFilter handleChange={handleChange} />
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
            xs={12}
            key={movieProps.id}
          >

            <MoviesPageCard {...movieProps} />
          </Grid>
        ))
        : (
          <Typography
            component="h3"
            variant="h5"
            sx={{ m: 'auto', mt: 3 }}
          >
            Could not fetch movies
          </Typography>
          )}
      </Grid>
    </Box>
  );
};

export default MoviesPage;

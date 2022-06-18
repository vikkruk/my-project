import {
 Box,
 FormControl,
 InputLabel,
 MenuItem,
 Select,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { genresFetchActionThunk } from '../../store/features/genres/genres-action-creators';
import selectGenres from '../../store/features/genres/genres-selectors';
import { useRootDispatch, useRootSelector } from '../../store/hooks';

type MoviesPageFilterProps = {
  handleChange: (genre: string) => void
};

const MoviesPageFilter: React.FC<MoviesPageFilterProps> = ({ handleChange }) => {
  const dispatch = useRootDispatch();
  const genres = useRootSelector(selectGenres);
  const [genreValue, setGenreValue] = useState('');

  useEffect(() => {
    dispatch(genresFetchActionThunk);
  }, []);

  return (
    <Box sx={{ maxWidth: 380, mx: 'auto', mt: 5 }}>
      <FormControl fullWidth>
        <InputLabel>Genre</InputLabel>
        <Select
          value={genreValue}
          label="Genre"
          onChange={(e) => {
            setGenreValue(e.target.value);
            handleChange(e.target.value);
}}
        >
          <MenuItem value="all">All genres</MenuItem>
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.name}>{`${genre.name.toUpperCase().slice(0, 1)}${genre.name.slice(1)}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default MoviesPageFilter;
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React, { useState } from 'react';

type ArtistPagesFilterProps = {
  handleChange: (genre: string) => void
};

const ArtistsPagesFilter: React.FC<ArtistPagesFilterProps> = ({ handleChange }) => {
  const [genderValue, setGenderValue] = useState('');

  return (
    <Box sx={{
      maxWidth: 380,
      mx: 'auto',
      mt: 2,
      mb: 2,
    }}
    >
      <FormControl fullWidth>
        <InputLabel>Gender</InputLabel>
        <Select
          value={genderValue}
          label="Gender"
          onChange={(e) => {
            setGenderValue(e.target.value);
            handleChange(e.target.value);
          }}
        >
          <MenuItem value="all">All genders</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="male">Male</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ArtistsPagesFilter;

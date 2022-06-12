import React from 'react';
import { Button } from '@mui/material';

type FilterButtonProps = {
  title: string,
  loggedIn?: boolean,
  onClick: () => void,
};

const FilterButton: React.FC<FilterButtonProps> = ({ title, loggedIn, onClick }) => (
  <Button
    variant="contained"
    sx={(theme) => ({
      ':hover': {
        bgcolor: theme.palette.info.main,
      },
    })}
    onClick={onClick}
    disabled={loggedIn}
  >
    {title}

  </Button>
);

export default FilterButton;

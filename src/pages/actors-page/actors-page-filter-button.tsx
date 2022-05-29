import React from 'react';
import { Button } from '@mui/material';

type ActorsPageFilterButtonProps = {
  title: string,
  onClick: () => void,
};

const ActorsPageFilterButton: React.FC<ActorsPageFilterButtonProps> = ({ title, onClick }) => (
  <Button
    variant="contained"
    sx={(theme) => ({
      ':hover': {
        bgcolor: theme.palette.info.main,
      },
    })}
    onClick={onClick}
  >
    {title}

  </Button>
);

export default ActorsPageFilterButton;

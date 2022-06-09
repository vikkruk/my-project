import React from 'react';
import { Button } from '@mui/material';

type ActorsPageFilterButtonProps = {
  title: string,
  loggedIn?: boolean,
  onClick: () => void,
};

const ActorsPageFilterButton: React.FC<ActorsPageFilterButtonProps> = ({ title, loggedIn, onClick }) => (
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

export default ActorsPageFilterButton;

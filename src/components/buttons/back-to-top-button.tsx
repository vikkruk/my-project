import React from 'react';
import {
  Box,
  Fab,
  Fade,
  useScrollTrigger,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const BackToTopButton: React.FC = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <Fab size="small" color="primary">
          <ArrowUpwardIcon />
        </Fab>
      </Box>
    </Fade>

  );
};

export default BackToTopButton;

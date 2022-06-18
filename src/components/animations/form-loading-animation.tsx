import React from 'react';
import { CircularProgress } from '@mui/material';

const loadinAnimationStyle = {
  alignSelf: 'center',
  height: 200,
  position: 'absolute',
};

const FormLoadingAnimation: React.FC = () => (
  <>
    <CircularProgress
      size={60}
      color="primary"
      sx={{
        ...loadinAnimationStyle,
        top: { xs: 15, md: 20 },
        right: { xs: 25, md: 40 },
      }}
    />
    <CircularProgress
      size={40}
      color="secondary"
      sx={{
        ...loadinAnimationStyle,
        top: { xs: 25, md: 30 },
        right: { xs: 35, md: 50 },
      }}
    />
  </>
);

export default FormLoadingAnimation;

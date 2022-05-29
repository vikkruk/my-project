import React from 'react';
import { CircularProgress } from '@mui/material';

const formLoadinAnimationStyle = {
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
        ...formLoadinAnimationStyle,
        top: { xs: 25, md: 70 },
        right: { xs: 35, md: 110 },
      }}
    />
    <CircularProgress
      size={40}
      color="secondary"
      sx={{
        ...formLoadinAnimationStyle,
        top: { xs: 35, md: 80 },
        right: { xs: 45, md: 120 },
      }}
    />
  </>
);

export default FormLoadingAnimation;

import React from 'react';
import { Divider } from '@mui/material';

const CustomDivider: React.FC = () => (
  <Divider sx={{
    width: {
      xs: '80%',
      md: '100%',
    },
    my: 2,
    mx: 'auto',
  }}
  />
);

export default CustomDivider;

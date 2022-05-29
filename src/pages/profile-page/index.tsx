import React from 'react';
import {
  Box, Container, Paper, Typography,
} from '@mui/material';
import { selectAuthUser } from '../../store/features/auth/auth-selectors';
import { useRootSelector } from '../../store/hooks';

const ProfilePage: React.FC = () => {
  const user = useRootSelector(selectAuthUser);

  return (
    <Container>
      <Paper sx={{
        my: 2,
        p: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        <Box
          component="img"
          src={user?.avatar}
          sx={{
            width: 200,
            height: 200,
            m: 2,
            objectFit: 'cover',
            borderRadius: '100%',
          }}
        />
        <Typography
          variant="h5"
          sx={{
            m: 5,
          }}
        >
          {user?.nickname}
        </Typography>
      </Paper>
    </Container>
  );
};

export default ProfilePage;

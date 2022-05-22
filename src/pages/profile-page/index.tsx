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
      <Paper>
        <Typography>
          {user?.nickname}
        </Typography>
        <Box
          component="img"
          src={user?.avatar}
          sx={{
            width: 200,
            height: 200,
            objectFit: 'cover',
            borderRadius: '100%',
          }}
        />
      </Paper>
    </Container>
  );
};

export default ProfilePage;

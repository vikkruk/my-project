import React, { useContext } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material';

import AuthContext from '../features/auth-context';

type AuthFormProps = {
  formTitle: string,
  buttonTitle: string,
  buttonActive: boolean,
  onSubmit?: React.FormEventHandler<HTMLFormElement>,
};

const AuthForm: React.FC<AuthFormProps> = ({
  children, formTitle, buttonTitle, buttonActive, onSubmit,
}) => {
  const { error, loading, clearError } = useContext(AuthContext);

  return (
    <Paper
      elevation={4}
      sx={(theme) => ({
        maxWidth: 600,
        margin: 'auto',
        mt: 20,
        p: 10,
        color: theme.palette.themeGreyColor.main,
        backgroundColor: theme.palette.common.white,
        position: 'relative',
      })}
    >
      {error && (
      <Alert
        sx={{
          position: 'absolute',
          width: '100%',
          top: 0,
          left: 0,
        }}
        onClose={clearError}
        severity="error"
        color="error"
      >
        {error}
      </Alert>
      )}
      {loading && (
        <>
          <CircularProgress
            size={60}
            color="themeBlueColor"
            sx={{
              alignSelf: 'center',
              height: 200,
              position: 'absolute',
              top: 70,
              right: 110,
            }}
          />
          <CircularProgress
            size={40}
            color="themeLightColor"
            sx={{
              alignSelf: 'center',
              height: 200,
              position: 'absolute',
              top: 80,
              right: 120,
            }}
          />
        </>
      )}
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
        onSubmit={onSubmit}
      >
        <Typography component="h1" variant="h3">{formTitle}</Typography>
        {children}
        <Button
          type="submit"
          color="themeBlueColor"
          sx={{
            fontSize: 20,
            fontWeight: 600,
            maxWidth: 200,
            alignSelf: 'center',
          }}
          disabled={!buttonActive || loading}
        >
          {buttonTitle}
        </Button>

      </Box>
    </Paper>
  );
};

export default AuthForm;

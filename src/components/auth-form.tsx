import React from 'react';
import {
  Alert,
  Box,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import FormLoadingAnimation from './loading-animation';
import { useRootSelector, useRootDispatch } from '../store/hooks';
import { selectAuth } from '../store/features/auth/auth-selectors';
import { authClearErrorAction } from '../store/features/auth/auth-action-creators';

type AuthFormProps = {
  formTitle: string,
  buttonTitle: string,
  buttonActive: boolean,
  onSubmit?: React.FormEventHandler<HTMLFormElement>,
};

const AuthForm: React.FC<AuthFormProps> = ({
  children, formTitle, buttonTitle, buttonActive, onSubmit,
}) => {
  const { error, success, loading } = useRootSelector(selectAuth);
  const dispatch = useRootDispatch();

  const clearError = () => {
    dispatch(authClearErrorAction);
  };

  return (
    <Paper
      elevation={4}
      sx={(theme) => ({
        maxWidth: { xs: 280, sm: 600 },
        margin: 'auto',
        mt: 10,
        p: { xs: 2, md: 10 },
        pt: { xs: 8, sm: 6 },
        color: theme.palette.primary.main,
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
      {
        success && (
          <Alert
            sx={{
          position: 'absolute',
          width: '100%',
          top: 0,
          left: 0,
        }}
            onClose={clearError}
            color="success"
            severity="success"
          >
            {success}

          </Alert>
        )
      }
      {loading && (<FormLoadingAnimation />)}
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
          color="primary"
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

import React from 'react';
import {
  Alert,
  Box,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import FormLoadingAnimation from '../../components/animations/form-loading-animation';

type AddDataFormProps = {
  formTitle: string,
  buttonTitle: string,
  buttonActive: boolean,
  error: string | null,
  success: string | null,
  loading: boolean,
  onSubmit: React.FormEventHandler<HTMLFormElement>,
  clearError: () => void,
  clearSuccess: () => void,
};

const AdminPageAddDataForm: React.FC<AddDataFormProps> = ({
  children,
  formTitle,
  buttonTitle,
  buttonActive,
  error,
  success,
  loading,
  onSubmit,
  clearError,
  clearSuccess,
}) => (
  <Paper
    elevation={4}
    sx={(theme) => ({
      maxWidth: { xs: 280, sm: 600 },
      margin: 'auto',
      mt: 10,
      p: { xs: 2, md: 10 },
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
          onClose={clearSuccess}
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

export default AdminPageAddDataForm;

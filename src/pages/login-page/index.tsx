import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FormikConfig, useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Typography } from '@mui/material';

import AuthForm from '../../components/auth-form';
import StyledHomeNavLink from '../../components/styled-home-navlink';
import AuthContext from '../../features/auth-context';

type LoginValues = {
  email: string,
  password: string,
};

type LoginFormikConfig = FormikConfig<LoginValues>;

const initialValues: LoginValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required')
    .max(32, 'Maximum length of an email is 32 symbols'),
  password: Yup.string()
    .required('Password is required')
    .matches(/(?=.*?[A-Z])/, 'Your password must contain at least one upper case letter')
    .matches(/(?=.*?[a-z])/, 'Your password must contain at least one lower case letter')
    .matches(/(?=.*?[0-9])/, 'Your password must contain at least one digit')
    .min(8, 'Password must contain at least 8 characters')
    .max(32, 'Password maximum length is 32 characters'),
});

const LoginPage: React.FC = () => {
  const { login, loading } = useContext(AuthContext);
  const [searchParams] = useSearchParams();

  const handleLogin: LoginFormikConfig['onSubmit'] = ({ email, password }) => {
    const next = searchParams.get('next') ?? '/';
    login({ email, password }, next);
  };

  const {
    values,
    errors,
    touched,
    dirty,
    isValid,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleLogin,

  });

  return (
    <AuthForm
      formTitle="Login"
      buttonTitle="Login"
      buttonActive={dirty && isValid}
      onSubmit={handleSubmit}
    >
      <TextField
        type="email"
        name="email"
        label="Email"
        autoComplete="off"
        value={values.email}
        error={touched.email && Boolean(errors.email)}
        helperText={touched.email && errors.email}
        disabled={loading}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextField
        type="password"
        name="password"
        label="Password"
        value={values.password}
        error={touched.password && Boolean(errors.password)}
        helperText={touched.password && errors.password}
        disabled={loading}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Typography variant="subtitle1">
        Do not have an account?
        {' '}
        <StyledHomeNavLink
          sx={{
            color: '#3A3845',
            fontSize: 18,
            ml: 1,
            fontWeight: 600,
            '&:hover': {
              color: '#040404',
            },
          }}
          to="/auth/register"
        >
          Register
        </StyledHomeNavLink>
        {' '}
      </Typography>
    </AuthForm>

  );
};

export default LoginPage;

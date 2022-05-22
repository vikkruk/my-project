import React from 'react';
import { FormikConfig, useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';

import AuthForm from '../../components/auth-form';
import { UserRegistration } from '../../types';
import { useRootSelector, useRootDispatch } from '../../store/hooks';
import { selectAuthLoading } from '../../store/features/auth/auth-selectors';
import { createRegisterAction } from '../../store/features/auth/auth-action-creators';

type RegisterValues = UserRegistration;

type RegisterFormikConfig = FormikConfig<RegisterValues>;

const initialValues: RegisterValues = {
  email: '',
  password: '',
  repeatPassword: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Enter your email')
    .email('Enter a valid email'),
  password: Yup.string()
    .required('Password is required')
    .matches(/(?=.*?[A-Z])/, 'Your password must contain at least one upper case letter')
    .matches(/(?=.*?[a-z])/, 'Your password must contain at least one lower case letter')
    .matches(/(?=.*?[0-9])/, 'Your password must contain at least one digit')
    .min(8, 'Password must contain at least 8 characters')
    .max(32, 'Password maximum length is 32 characters'),
  repeatPassword: Yup.string()
    .required('Repeat your password')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

const RegisterPage: React.FC = () => {
  const loading = useRootSelector(selectAuthLoading);
  const dispatch = useRootDispatch();

  const handleRegister: RegisterFormikConfig['onSubmit'] = ({ email, password, repeatPassword }) => {
    dispatch(createRegisterAction({ email, password, repeatPassword }, '/'));
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
    setFieldTouched,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <AuthForm
      formTitle="Register"
      buttonTitle="Register"
      onSubmit={handleSubmit}
      buttonActive={dirty && isValid}
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
      <TextField
        type="password"
        name="repeatPassword"
        label="Repeat Password"
        value={values.repeatPassword}
        error={touched.repeatPassword && Boolean(errors.repeatPassword)}
        helperText={touched.repeatPassword && errors.repeatPassword}
        disabled={loading}
        onChange={(e) => {
          setFieldTouched('repeatPassword');
          handleChange(e);
        }}
        onBlur={handleBlur}
      />
    </AuthForm>

  );
};

export default RegisterPage;

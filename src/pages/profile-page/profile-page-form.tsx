import React from 'react';
import { FormikConfig, useFormik } from 'formik';
import * as Yup from 'yup';
import validator from 'validator';
import { TextField } from '@mui/material';
import { UserUpdateValues } from '../../types';
import AuthForm from '../../components/auth-form';
import AuthService from '../../services/auth-service';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { createAuthUpdateUserActionThunk } from '../../store/features/auth/auth-action-creators';
import { selectAuth } from '../../store/features/auth/auth-selectors';

type UserUpdateFormikValues = {
  emailInit: string,
  email: string,
  nicknameInit: string,
  nickname: string,
  avatar: string,
};

type RegisterFormikConfig = FormikConfig<UserUpdateFormikValues>;

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Enter your email')
    .test(
      'emailAvailabilityCheck',
      'Email is not valid',
      async (email, context) => {
        if (email === context.parent.emailInit) return true;
        if (!email) return false;
        if (!validator.isEmail(email)) return false;
        try {
          const emailIsAvailable: boolean = await AuthService.checkAvailability(email, 'email');
          return emailIsAvailable;
        } catch (error) {
          throw context.createError({
            message: error instanceof Error ? error.message : error as string,
          });
        }
      },
    ),
  nickname: Yup.string()
    .required('Nickname is required')
    .test(
      'nicknameAvailabilityCheck',
      'Nickname is not valid',
      async (nickname, context) => {
        if (nickname === context.parent.nicknameInit) return true;
        if (!nickname) return false;
        try {
          const nicknameIsAvailable = await AuthService.checkAvailability(nickname, 'nickname');
          return nicknameIsAvailable;
        } catch (error) {
          throw context.createError({
            message: error instanceof Error ? error.message : error as string,
          });
        }
      },
    )
    .min(2, 'Nickname must contain at least 8 characters')
    .max(20, 'Nickname maximum length is 32 characters'),
  avatar: Yup.string()
    .url('This should be a url'),
});

const ProfilePageForm: React.FC = () => {
  const { loading, user } = useRootSelector(selectAuth);
  if (user === null) {
    throw new Error('You have to be logged in');
  }
  const dispatch = useRootDispatch();

  const updateUser: RegisterFormikConfig['onSubmit'] = (values: UserUpdateFormikValues) => {
    const userUpdateValues: UserUpdateValues = {};

    Object.entries(values).forEach(([key, value]) => {
      const thisKey = key as keyof UserUpdateFormikValues;
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (value !== initialValues[thisKey]) {
        userUpdateValues[thisKey as keyof UserUpdateValues] = value;
      }
    });
    dispatch(createAuthUpdateUserActionThunk(userUpdateValues));
  };

  const {
    initialValues,
    values,
    errors,
    touched,
    dirty,
    isValid,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik<UserUpdateFormikValues>({
    initialValues: {
      emailInit: user.email,
      email: user.email,
      nicknameInit: user.nickname,
      nickname: user.nickname,
      avatar: user.avatar ?? '',
    },
    validationSchema,
    onSubmit: updateUser,
  });

  return (
    <AuthForm
      formTitle="User Info"
      buttonTitle="Update"
      margin="0px"
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
        type="text"
        name="nickname"
        label="Nickname"
        value={values.nickname}
        error={touched.nickname && Boolean(errors.nickname)}
        helperText={touched.nickname && errors.nickname}
        disabled={loading}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextField
        type="url"
        name="avatar"
        label="Avatar"
        value={values.avatar}
        error={touched.avatar && Boolean(errors.avatar)}
        helperText={touched.avatar && errors.avatar}
        disabled={loading}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </AuthForm>

  );
};

export default ProfilePageForm;

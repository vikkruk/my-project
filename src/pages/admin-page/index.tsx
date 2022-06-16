import React from 'react';
import { FormikConfig, useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import AuthForm from '../../components/auth-form';
import { ArtistData } from '../../types';
import { useRootSelector } from '../../store/hooks';
import AdminService from '../../services/admin-service';
import { selectAuthLoading } from '../../store/features/auth/auth-selectors';

type AddPersonDataValues = ArtistData;

type RegisterFormikConfig = FormikConfig<AddPersonDataValues>;

const initialValues: AddPersonDataValues = {
  name: '',
  surname: '',
  img: '',
  gender: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Enter actor\'s name'),
  surname: Yup.string()
    .required('Enter actor\'s surname'),
  img: Yup.string()
    .required('Enter a link to actor\'s photo')
    .url(),
  gender: Yup.string()
    .required('Enter actor\'s gender'),
});

const AdminPage: React.FC = () => {
  const loading = useRootSelector(selectAuthLoading);

  const handleAddData: RegisterFormikConfig['onSubmit'] = async ({
    name, surname, img, gender,
  }, { resetForm }) => {
    await AdminService.addPersonData({
      name, surname, img, gender,
    }, 'people');
    resetForm();
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
    onSubmit: handleAddData,
  });

  return (
    <AuthForm
      formTitle="Add Data"
      buttonTitle="Add"
      onSubmit={handleSubmit}
      buttonActive={dirty && isValid}
    >
      <TextField
        type="name"
        name="name"
        label="Name"
        autoComplete="off"
        value={values.name}
        error={touched.name && Boolean(errors.name)}
        helperText={touched.name && errors.name}
        disabled={loading}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextField
        type="surname"
        name="surname"
        label="Surname"
        value={values.surname}
        error={touched.surname && Boolean(errors.surname)}
        helperText={touched.surname && errors.surname}
        disabled={loading}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextField
        type="img"
        name="img"
        label="Image"
        value={values.img}
        error={touched.img && Boolean(errors.img)}
        helperText={touched.img && errors.img}
        disabled={loading}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextField
        type="gender"
        name="gender"
        label="Gender"
        value={values.gender}
        error={touched.gender && Boolean(errors.gender)}
        helperText={touched.gender && errors.gender}
        disabled={loading}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </AuthForm>

  );
};

export default AdminPage;

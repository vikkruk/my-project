import React, { useEffect, useState } from 'react';
import { FormikConfig, useFormik } from 'formik';
import * as Yup from 'yup';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { selectAuth } from '../../store/features/auth/auth-selectors';
import { artistRolesFetchActionThunk } from '../../store/features/artist-roles/artist-roles-action-creators';
import selectArtistRoles from '../../store/features/artist-roles/artist-roles-selectors';
import { AddArtistData } from '../../types';
import { createDataAdditionThunk, artistsClearErrorAction, artistsClearSuccessAction } from '../../store/features/artists/artists-action-creators';
import AdminPageAddDataForm from './admin-page-add-data-form';
import { selectArtists } from '../../store/features/artists/artists-selectors';

type RegisterFormikConfig = FormikConfig<AddArtistData>;

const initialValues: AddArtistData = {
  name: '',
  surname: '',
  img: '',
  gender: '',
  roles: [],
};
const validationSchema = Yup.object({
  name: Yup.string()
  .required('Enter artist\'s name'),
  surname: Yup.string()
  .required('Enter artist\'s surname'),
  img: Yup.string()
  .required('Enter a link to artist\'s photo')
  .url('This should be a url'),
  gender: Yup.string()
  .required('Enter artist\'s gender')
  .matches(/male/ || /female/, 'It\'s "male" or "female", dummy'),
  roles: Yup.array()
  .of(Yup.string())
  .min(1)
  .required('Don\'t forget about these boxes, mate'),
});

const AdminPageAddArtist: React.FC = () => {
  const { token } = useRootSelector(selectAuth);
  const { error, success, loading } = useRootSelector(selectArtists);
  const dispatch = useRootDispatch();
  const artistRoles = useRootSelector(selectArtistRoles);

  useEffect(() => {
    dispatch(artistRolesFetchActionThunk);
  }, []);

  const handleAddData: RegisterFormikConfig['onSubmit'] = async (submittedValues, { resetForm }) => {
    if (token) {
      dispatch(createDataAdditionThunk(submittedValues, token));
    }
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
    <AdminPageAddDataForm
      formTitle="Add Artist"
      buttonTitle="Add"
      error={error}
      success={success}
      loading={loading}
      onSubmit={handleSubmit}
      clearError={() => dispatch(artistsClearErrorAction)}
      clearSuccess={() => dispatch(artistsClearSuccessAction)}
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
      {
        artistRoles.map((artistRole) => (
          <FormControlLabel
            key={artistRole.id}
            control={(
              <Checkbox
                inputProps={{ type: 'checkbox' }}
                onChange={(e) => {
                if (e.target.checked === true) {
                  values.roles.push(artistRole.id);
                } else values.roles = values.roles.filter((role) => role !== artistRole.id);
                handleChange(e);
              }}
              />
)}
            label={artistRole.title.slice(0, 1).toUpperCase() + artistRole.title.slice(1)}
            name={artistRole.title}
          />
        ))
      }
    </AdminPageAddDataForm>

  );
};

export default AdminPageAddArtist;

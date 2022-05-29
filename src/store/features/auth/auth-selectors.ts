import { RootState } from '../../types';

export const selectAuthError = (state: RootState) => state.auth.error;

export const selectAuthLoggedIn = (state: RootState) => Boolean(state.auth.user);

export const selectAuthLoading = (state: RootState) => state.auth.loading;

export const selectAuthUser = (state: RootState) => state.auth.user;

export const selectAuthAdmin = (state: RootState) => state.auth.admin;
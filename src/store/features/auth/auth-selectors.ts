import { RootState } from '../../redux-types';

export const selectAuthError = (state: RootState) => state.auth.error;

export const selectAuthSuccess = (state: RootState) => state.auth.success;

export const selectAuthLoggedIn = (state: RootState) => Boolean(state.auth.user);

export const selectAuthLoading = (state: RootState) => state.auth.loading;

export const selectAuthUser = (state: RootState) => state.auth.user;

export const selectAuthToken = (state: RootState) => state.auth.token;

export const selectAuthRole = (state: RootState) => state.auth.user?.role;

export const selectAuth = (state: RootState) => state.auth;

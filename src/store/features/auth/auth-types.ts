import { User } from '../../../types';

export type AuthState = {
  token: string | null,
  user: null | User,
  error: string | null,
  success: string | null,
  loading: boolean,
};

export enum AuthActionType {
  AUTH_LOADING = 'AUTH_LOADING',
  AUTH_UPDATE_USER_SUCCESS = 'AUTH_UPDATE_USER_SUCCESS',
  AUTH_CLEAR_ERROR = 'AUTH_CLEAR_ERROR',
  AUTH_CLEAR_SUCCESS = 'AUTH_CLEAR_SUCCESS',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
  AUTH_ADMIN_LOGIN = 'AUTH_ADMIN_LOGIN',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_FAILURE = 'AUTH_FAILURE',
  AUTH_UPDATE_USER = 'AUTH_UPDATE_USER',
}

export type AuthLoadingAction = {
  type: AuthActionType.AUTH_LOADING,
};

export type AuthUpdateUserSuccessAction = {
  type: AuthActionType.AUTH_UPDATE_USER_SUCCESS,
};

export type AuthClearErrorAction = {
  type: AuthActionType.AUTH_CLEAR_ERROR,
};

export type AuthClearSuccessAction = {
  type: AuthActionType.AUTH_CLEAR_SUCCESS,
};

export type AuthLogoutAction = {
  type: AuthActionType.AUTH_LOGOUT,
};

export type AuthAdminLoginAction = {
  type: AuthActionType.AUTH_ADMIN_LOGIN,
};
export type AuthSuccessAction = {
  type: AuthActionType.AUTH_SUCCESS,
  payload: {
    user: User,
    token: string,
  },
};

export type AuthFailureAction = {
  type: AuthActionType.AUTH_FAILURE,
  payload: { error: string },
};

export type AuthUpdateUserAction = {
  type: AuthActionType.AUTH_UPDATE_USER,
  payload: {
    user: User,
    token: string,
  },
};

export type AuthAction = AuthLoadingAction | AuthUpdateUserSuccessAction | AuthSuccessAction | AuthFailureAction | AuthClearErrorAction | AuthClearSuccessAction | AuthLogoutAction | AuthAdminLoginAction | AuthUpdateUserAction;

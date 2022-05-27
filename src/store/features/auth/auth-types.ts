import { User } from '../../../types';

export type AuthState = {
  user: null | User,
  error: string | null,
  loading: boolean,

};

export enum AuthActionType {
  AUTH_LOADING = 'AUTH_LOADING',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_FAILURE = 'AUTH_FAILURE',
  AUTH_CLEAR_ERROR = 'AUTH_CLEAR_ERROR',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
}

export type AuthLoadingAction = {
  type: AuthActionType.AUTH_LOADING,
};

export type AuthSuccessAction = {
  type: AuthActionType.AUTH_SUCCESS,
  payload: { user: User },
};

export type AuthFailureAction = {
  type: AuthActionType.AUTH_FAILURE,
  payload: { error: string },
};

export type AuthClearErrorAction = {
  type: AuthActionType.AUTH_CLEAR_ERROR,
};

export type AuthLogoutAction = {
  type: AuthActionType.AUTH_LOGOUT,
};

export type AuthAction = AuthLoadingAction | AuthSuccessAction | AuthFailureAction | AuthClearErrorAction | AuthLogoutAction;

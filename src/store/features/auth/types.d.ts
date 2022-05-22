import { User } from '../../../types';

export type AuthState = {
  user: null | User,
  error: string | null,
  loading: boolean,

};

export type AuthLoadingAction = {
  type: 'AUTH_LOADING',
};

export type AuthSuccessAction = {
  type: 'AUTH_SUCCESS',
  payload: { user: User },
};

export type AuthFailureAction = {
  type: 'AUTH_FAILURE',
  payload: { error: string },
};

export type AuthClearErrorAction = {
  type: 'AUTH_CLEAR_ERROR',
};

export type AuthLogoutAction = {
  type: 'AUTH_LOGOUT',
};

export type AuthAction = AuthLoadingAction | AuthSuccessAction | AuthFailureAction | AuthClearErrorAction | AuthLogoutAction;

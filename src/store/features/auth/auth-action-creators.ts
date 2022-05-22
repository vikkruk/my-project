import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import pause from '../../../helpers/pause';
import { Credentials, User, UserRegistration } from '../../../types';
import { AppAction } from '../../types';
import AuthService, { AuthPromise } from './auth-service';
import {
  AuthClearErrorAction, AuthFailureAction, AuthLoadingAction, AuthLogoutAction, AuthSuccessAction,
} from './types';

export const authLoadingAction: AuthLoadingAction = {
  type: 'AUTH_LOADING',
};

export const authClearErrorAction: AuthClearErrorAction = {
  type: 'AUTH_CLEAR_ERROR',
};

export const authLogoutAction: AuthLogoutAction = {
  type: 'AUTH_LOGOUT',
};

export const createAuthSuccessAction = (user: User): AuthSuccessAction => ({
  type: 'AUTH_SUCCESS',
  payload: { user },
});

export const createAuthFailureAction = (error: string): AuthFailureAction => ({
  type: 'AUTH_FAILURE',
  payload: { error },
});

export const authenticate = async (credentials: Credentials, next: string, authMethod: AuthPromise, dispatch: Dispatch<AppAction>): Promise<void> => {
  try {
    dispatch(authLoadingAction);
    await pause(700);
    const user = await authMethod(credentials);
    dispatch(createAuthSuccessAction(user));
    dispatch(authClearErrorAction);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    dispatch(createAuthFailureAction(errorMsg));
  }
};

export const createLoginAction = (credentials: Credentials, next: string) => async (dispatch: Dispatch<AppAction>) => {
  await authenticate(credentials, next, AuthService.login, dispatch);
};

export const createRegisterAction = (credentials: UserRegistration, next: string) => async (dispatch: Dispatch<AppAction>) => {
  await authenticate(credentials, next, AuthService.register, dispatch);
};

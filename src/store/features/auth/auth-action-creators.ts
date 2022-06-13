import { Dispatch } from 'redux';
import { Credentials, User, UserRegistration } from '../../../types';
import { AppAction, RootState } from '../../types';
import {
  AuthActionType,
  AuthAdminLoginAction,
  AuthClearErrorAction,
  AuthFailureAction,
  AuthLoadingAction,
  AuthLogoutAction,
  AuthSuccessAction,
} from './auth-types';
import pause from '../../../helpers/pause';
import { createNavigationSetNextAction } from '../navigation/navigation-action-creators';
import AuthService, { AuthResponseBody } from '../../../services/auth-service';

export const authLoadingAction: AuthLoadingAction = {
  type: AuthActionType.AUTH_LOADING,
};

export const authClearErrorAction: AuthClearErrorAction = {
  type: AuthActionType.AUTH_CLEAR_ERROR,
};

export const authLogoutAction: AuthLogoutAction = {
  type: AuthActionType.AUTH_LOGOUT,
};

export const authAdminLogin: AuthAdminLoginAction = {
  type: AuthActionType.AUTH_ADMIN_LOGIN,
};

export const createAuthSuccessAction = (authResponseBody: AuthResponseBody): AuthSuccessAction => ({
  type: AuthActionType.AUTH_SUCCESS,
  payload: authResponseBody,
});

export const createAuthFailureAction = (error: string): AuthFailureAction => ({
  type: AuthActionType.AUTH_FAILURE,
  payload: { error },
});

export const authenticate = async (
  authMethod: () => Promise<AuthResponseBody>,
  dispatch: Dispatch<AppAction>,
  next?: string,
): Promise<void> => {
  try {
    dispatch(authLoadingAction);
    await pause(700);
    const authResponseBody = await authMethod();
    if (next !== undefined) {
      dispatch(createNavigationSetNextAction(next));
    }
    dispatch(createAuthSuccessAction(authResponseBody));
    dispatch(authClearErrorAction);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    dispatch(createAuthFailureAction(errorMsg));
  }
};
export const createAuthenticateActionThunk = (token: string) => async (
  dispatch: Dispatch<AppAction>,
): Promise<void> => {
  await pause(2000);
  await authenticate(async () => AuthService.authenticate(token), dispatch);
};

export const createLoginActionThunk = (credentials: Credentials, next: string) => async (dispatch: Dispatch<AppAction>): Promise<void> => {
  await authenticate(async () => AuthService.login(credentials), dispatch, next);
};

export const createRegisterActionThunk = (credentials: Credentials, next: string) => async (dispatch: Dispatch<AppAction>): Promise<void> => {
  await authenticate(async () => AuthService.register(credentials), dispatch, next);
};

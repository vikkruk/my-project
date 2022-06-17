import { Dispatch } from 'redux';
import {
  AuthActionType,
  AuthAdminLoginAction,
  AuthClearErrorAction,
  AuthClearSuccessAction,
  AuthFailureAction,
  AuthLoadingAction,
  AuthLogoutAction,
  AuthSuccessAction,
} from './auth-types';
import { AppAction, RootState } from '../../redux-types';
import { Credentials, UserUpdateValues } from '../../../types';
import { createNavigationSetNextAction, navigationClearNextAction } from '../navigation/navigation-action-creators';
import AuthService, { AuthResponseBody } from '../../../services/auth-service';
import pause from '../../../helpers/pause';

export const authLoadingAction: AuthLoadingAction = {
  type: AuthActionType.AUTH_LOADING,
};

export const authClearErrorAction: AuthClearErrorAction = {
  type: AuthActionType.AUTH_CLEAR_ERROR,
};

export const authClearSuccessAction: AuthClearSuccessAction = {
  type: AuthActionType.AUTH_CLEAR_SUCCESS,
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
    if (next) {
      dispatch(createNavigationSetNextAction(next));
    }

    dispatch(createAuthSuccessAction(authResponseBody));
    if (next) {
      dispatch(navigationClearNextAction);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    dispatch(createAuthFailureAction(errorMessage));
  }
};
export const createAuthenticateActionThunk = (token: string, next: string) => async (
  dispatch: Dispatch<AppAction>,
): Promise<void> => {
  await authenticate(async () => AuthService.authenticate(token), dispatch, next);
};

export const createLoginActionThunk = (credentials: Credentials, next: string) => async (dispatch: Dispatch<AppAction>): Promise<void> => {
  await authenticate(async () => AuthService.login(credentials), dispatch, next);
};

export const createRegisterActionThunk = (credentials: Credentials, next: string) => async (dispatch: Dispatch<AppAction>): Promise<void> => {
  await authenticate(async () => AuthService.register(credentials), dispatch, next);
};

export const createAuthUpdateUserActionThunk = (updateValues: UserUpdateValues) => async (
  dispatch: Dispatch<AppAction>,
  getState: () => RootState,
): Promise<void> => {
  const { token } = getState().auth;
  if (token !== null) {
    await authenticate(async () => AuthService.updateUser(updateValues, token), dispatch);
  }
};

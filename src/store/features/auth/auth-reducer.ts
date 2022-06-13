/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';
import { AuthAction, AuthActionType, AuthState } from './auth-types';
import { setLocalStorage, getLocalStorage } from '../../../helpers/local-storage-helpers';

const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE;

if (TOKEN_KEY === undefined) {
  throw new Error('Please declare REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE in/.env');
}

const initialValues: AuthState = {
  token: getLocalStorage(TOKEN_KEY),
  user: null,
  error: null,
  loading: false,
};

const authReducer: Reducer<AuthState, AuthAction> = (state = initialValues, action) => {
  switch (action.type) {
    case AuthActionType.AUTH_LOADING: {
      return {
        ...state,
        error: null,
        loading: true,
        token: null,
      };
    }
    case AuthActionType.AUTH_SUCCESS: {
      setLocalStorage(TOKEN_KEY, action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
      };
    }

    case AuthActionType.AUTH_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        user: null,
        token: null,
        loading: false,
      };
    }
    case AuthActionType.AUTH_CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }

    case AuthActionType.AUTH_LOGOUT: {
      localStorage.removeItem(TOKEN_KEY);
      return {
        ...state,
        user: null,
      };
    }
    default: return state;
  }
};

export default authReducer;

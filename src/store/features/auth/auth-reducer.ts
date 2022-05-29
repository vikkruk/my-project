/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';
import { AuthAction, AuthActionType, AuthState } from './auth-types';
import { setLocalStorage, getLocalStorage } from '../../../helpers/local-storage-helpers';

const USER_KEY = process.env.REACT_APP_USER_KEY_IN_LOCAL_STORAGE;

const initialValues: AuthState = {
  user: getLocalStorage(USER_KEY),
  error: null,
  loading: false,
  admin: false,
};

const authReducer: Reducer<AuthState, AuthAction> = (state = initialValues, action) => {
  switch (action.type) {
    case AuthActionType.AUTH_LOADING: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case AuthActionType.AUTH_CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }

    case AuthActionType.AUTH_SUCCESS: {
      setLocalStorage(USER_KEY, action.payload.user);
      return {
        ...state,
        user: action.payload.user,
        loading: false,
      };
    }

    case AuthActionType.AUTH_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    }

    case AuthActionType.AUTH_ADMIN_LOGIN: {
      return {
        ...state,
        admin: true,
      };
    }

    case AuthActionType.AUTH_LOGOUT: {
      localStorage.removeItem(USER_KEY);
      return {
        ...state,
        user: null,
        admin: false,
      };
    }
    default: return state;
  }
};

export default authReducer;

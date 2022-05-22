/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';

import { setLocalStorage, getLocalStorage } from '../../../helpers/local-storage-helpers';
import { AuthAction, AuthState } from './types';

const USER_KEY = 'user';

const initialValues: AuthState = {
  user: getLocalStorage(USER_KEY),
  error: null,
  loading: false,
};

const authReducer: Reducer<AuthState, AuthAction> = (state = initialValues, action) => {
  switch (action.type) {
    case 'AUTH_LOADING': {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case 'AUTH_CLEAR_ERROR': {
      return {
        ...state,
        error: null,
      };
    }

    case 'AUTH_SUCCESS': {
      setLocalStorage(USER_KEY, action.payload.user);
      return {
        ...state,
        user: action.payload.user,
        loading: false,
      };
    }

    case 'AUTH_FAILURE': {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    }

    case 'AUTH_LOGOUT': {
      localStorage.removeItem(USER_KEY);
      return {
        ...state,
        user: null,
      };
    }
    default: return state;
  }
};

export default authReducer;

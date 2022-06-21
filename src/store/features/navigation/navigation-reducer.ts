/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';
import {
  NavigationAction,
  NavigationActionType,
  NavigationState,
} from './navigation-types';

const initialValues: NavigationState = {
  next: null,
};

const navigationReducer: Reducer<NavigationState, NavigationAction> = (state = initialValues, action) => {
  switch (action.type) {
    case NavigationActionType.NAVIGATION_SET_NEXT: {
      return {
        ...state,
        next: action.payload.next,
      };
    }
    case NavigationActionType.NAVIGATION_CLEAR_NEXT: {
      return {
        ...state,
        next: null,
      };
    }
    default: return state;
  }
};

export default navigationReducer;

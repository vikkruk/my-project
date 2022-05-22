import { NavigationClearNextAction, NavigationSetNextAction } from './types';

export const createNavigationSetNextAction = (next: string): NavigationSetNextAction => ({
  type: 'NAVIGATION_SET_NEXT',
  payload: { next },
});

export const createNavigationClearNextAction: NavigationClearNextAction = {
  type: 'NAVIGATION_CLEAR_NEXT',
};

import { NavigationActionType, NavigationClearNextAction, NavigationSetNextAction } from './navigation-types';

export const navigationClearNextAction: NavigationClearNextAction = {
  type: NavigationActionType.NAVIGATION_CLEAR_NEXT,
};

export const createNavigationSetNextAction = (next: string): NavigationSetNextAction => ({
  type: NavigationActionType.NAVIGATION_SET_NEXT,
  payload: { next },
});

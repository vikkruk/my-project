export type NavigationState = {
  next: string | null,
};

export enum NavigationActionType {
  NAVIGATION_SET_NEXT = 'NAVIGATION_SET_NEXT',
  NAVIGATION_CLEAR_NEXT = 'NAVIGATION_CLEAR_NEXT',
}

export type NavigationSetNextAction = {
  type: NavigationActionType.NAVIGATION_SET_NEXT,
  payload: { next: string },
};

export type NavigationClearNextAction = {
  type: NavigationActionType.NAVIGATION_CLEAR_NEXT,
};

export type NavigationAction = NavigationSetNextAction | NavigationClearNextAction;

export type NavigationState = {
  next: string | null,
};

export type NavigationSetNextAction = {
  type: 'NAVIGATION_SET_NEXT',
  payload: { next: string },
};

export type NavigationClearNextAction = {
  type: 'NAVIGATION_CLEAR_NEXT',
};

export type NavigationAction = NavigationSetNextAction | NavigationClearNextAction;

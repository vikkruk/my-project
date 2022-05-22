import { ThunkDispatch } from 'redux-thunk';
import { Actor } from '../types';
import { ActorsAction, ActorsState } from './features/actors/types';
import { AuthAction, AuthState } from './features/auth/types';
import { NavigationAction, NavigationState } from './features/navigation/types';

export type RootState = {
  auth: AuthState,
  actors: ActorsState,
  navigation: NavigationState,
};

export type AppAction = AuthAction | ActorsAction | NavigationAction;

export type AppDispatch = ThunkDispatch<RootState, undefined, AppAction>;

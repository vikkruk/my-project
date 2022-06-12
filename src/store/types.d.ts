import { ThunkDispatch } from 'redux-thunk';
import { ArtistsAction, ArtistsState } from './features/artists/artists-types';
import { AuthAction, AuthState } from './features/auth/auth-types';
import { NavigationAction, NavigationState } from './features/navigation/navigation-types';

export type RootState = {
  auth: AuthState,
  artists: ArtistsState,
  navigation: NavigationState,
};

export type AppAction = AuthAction | ArtistsAction | NavigationAction;

export type AppDispatch = ThunkDispatch<RootState, undefined, AppAction>;

import { ThunkDispatch } from 'redux-thunk';
import { ArtistRolesState } from './features/artist-roles/artist-roles-types';
import { ArtistsAction, ArtistsState } from './features/artists/artists-types';
import { AuthAction, AuthState } from './features/auth/auth-types';
import { GenresState } from './features/genres/genres-types';
import { MoviesAction, MoviesState } from './features/movies/movies-types';
import { NavigationAction, NavigationState } from './features/navigation/navigation-types';

export type RootState = {
  auth: AuthState,
  artists: ArtistsState,
  artistRoles: ArtistRolesState,
  movies: MoviesState,
  genres: GenresState,
  navigation: NavigationState,
};

export type AppAction = AuthAction | ArtistsAction | NavigationAction | MoviesAction | GenresAction | ArtistRolesAction;

export type AppDispatch = ThunkDispatch<RootState, undefined, AppAction>;

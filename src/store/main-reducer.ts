import { combineReducers } from 'redux';
import artistRolesReducer from './features/artist-roles/artist-roles-reducer';
import artistsReducer from './features/artists/artists-reducer';
import authReducer from './features/auth/auth-reducer';
import genresReducer from './features/genres/genres-reducer';
import moviesReducer from './features/movies/movies-reducer';
import navigationReducer from './features/navigation/navigation-reducer';

const mainReducer = combineReducers({
  auth: authReducer,
  artists: artistsReducer,
  artistRoles: artistRolesReducer,
  movies: moviesReducer,
  genres: genresReducer,
  navigation: navigationReducer,
});

export default mainReducer;

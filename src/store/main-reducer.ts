import { combineReducers } from 'redux';
import artistsReducer from './features/artists/artists-reducer';
import authReducer from './features/auth/auth-reducer';
import moviesReducer from './features/movies/movies-reducer';
import navigationReducer from './features/navigation/navigation-reducer';

const mainReducer = combineReducers({
  auth: authReducer,
  artists: artistsReducer,
  movies: moviesReducer,
  navigation: navigationReducer,
});

export default mainReducer;

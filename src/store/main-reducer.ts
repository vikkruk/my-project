/* eslint-disable @typescript-eslint/default-param-last */
import { combineReducers } from 'redux';
import actorsReducer from './features/actors/actors-reducer';
import authReducer from './features/auth/auth-reducer';
import navigationReducer from './features/navigation/navigation-reducer';

const mainReducer = combineReducers({
  auth: authReducer,
  actors: actorsReducer,
  navigation: navigationReducer,
});

export default mainReducer;

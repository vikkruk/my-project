/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';
import { MoviesAction, MoviesActionType, MoviesState } from './movies-types';

const initialState: MoviesState = {
  movies: [],
  error: null,
};

const moviesReducer: Reducer<MoviesState, MoviesAction> = (state = initialState, action) => {
  switch (action.type) {
    case MoviesActionType.MOVIES_FETCH_SUCCESS: {
      return {
        ...state,
        movies: action.payload.movies,
      };
    }
    case MoviesActionType.MOVIES_FETCH_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    default: return state;
  }
};

export default moviesReducer;

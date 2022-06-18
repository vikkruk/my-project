/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';
import { GenresAction, GenresActionType, GenresState } from './genres-types';

const initialState: GenresState = {
  genres: [],
  error: null,
};

const genresReducer: Reducer<GenresState, GenresAction> = (state = initialState, action) => {
  switch (action.type) {
    case GenresActionType.GENRES_FETCH_SUCCESS: {
      return {
        ...state,
        genres: action.payload.genres,
      };
    }
    case GenresActionType.GENRES_FETCH_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    default: return state;
  }
};

export default genresReducer;

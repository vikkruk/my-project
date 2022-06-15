import { Dispatch } from 'redux';
import { Movie } from '../../../types';
import { AppAction } from '../../redux-types';

import {
  MoviesActionType,
  MoviesFetchFailureAction,
  MoviesFetchSuccessAction,
} from './movies-types';
import MoviesService from '../../../services/movies-service';

export const createMoviesFetchSuccess = (movies: Movie[]): MoviesFetchSuccessAction => ({
  type: MoviesActionType.MOVIES_FETCH_SUCCESS,
  payload: { movies },
});

export const createMoviesFetchFailure = (error: string): MoviesFetchFailureAction => ({
  type: MoviesActionType.MOVIES_FETCH_FAILURE,
  payload: { error },
});

export const moviesFetchActionThunk = (genre?: string) => async (dispatch: Dispatch<AppAction>): Promise<void> => {
  try {
    const movies = await MoviesService.fetchMovies(genre);
    dispatch(createMoviesFetchSuccess(movies));
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    dispatch(createMoviesFetchFailure(errorMsg));
  }
};

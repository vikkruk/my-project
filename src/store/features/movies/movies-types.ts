import { Movie } from '../../../types';

export type MoviesState = {
  movies: Movie[],
  error: string | null,
};

export enum MoviesActionType {
  MOVIES_FETCH_SUCCESS = 'MOVIES_FETCH_SUCCESS',
  MOVIES_FETCH_FAILURE = 'MOVIES_FETCH_FAILURE',
}

export type MoviesFetchSuccessAction = {
  type: MoviesActionType.MOVIES_FETCH_SUCCESS,
  payload: { movies: Movie[] }
};

export type MoviesFetchFailureAction = {
  type: MoviesActionType.MOVIES_FETCH_FAILURE,
  payload: { error: string },
};

export type MoviesAction = MoviesFetchSuccessAction | MoviesFetchFailureAction;

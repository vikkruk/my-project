import { Dispatch } from 'redux';
import { Movie } from '../../../types';
import { AppAction } from '../../redux-types';

import ApiService from '../../../services/api-service';
import {
  MoviesActionType,
  MoviesFetchFailureAction,
  MoviesFetchSuccessAction,
} from './movies-types';

export const createMoviesFetchSuccess = (movies: Movie[]): MoviesFetchSuccessAction => ({
  type: MoviesActionType.MOVIES_FETCH_SUCCESS,
  payload: { movies },
});

export const createMoviesFetchFailure = (error: string): MoviesFetchFailureAction => ({
  type: MoviesActionType.MOVIES_FETCH_FAILURE,
  payload: { error },
});

export const moviesFetchAction = async (dispatch: Dispatch<AppAction>): Promise<void> => {
  try {
    const { data } = await ApiService.get<Movie[]>('/movies');
    dispatch(createMoviesFetchSuccess(data));
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    dispatch(createMoviesFetchFailure(errorMsg));
  }
};

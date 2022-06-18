import { Dispatch } from 'redux';
import { Genre } from '../../../types';
import { AppAction } from '../../redux-types';
import { GenresActionType, GenresFetchFailureAction, GenresFetchSuccessAction } from './genres-types';
import GenresService from '../../../services/genres-service';

export const createGenresFetchSuccess = (genres: Genre[]): GenresFetchSuccessAction => ({
  type: GenresActionType.GENRES_FETCH_SUCCESS,
  payload: { genres },
});

export const createGenresFetchFailure = (error: string): GenresFetchFailureAction => ({
  type: GenresActionType.GENRES_FETCH_FAILURE,
  payload: { error },
});

export const genresFetchActionThunk = async (dispatch: Dispatch<AppAction>): Promise<void> => {
  try {
    const genres = await GenresService.fetchGenres();
    dispatch(createGenresFetchSuccess(genres));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    dispatch(createGenresFetchFailure(errorMessage));
  }
};

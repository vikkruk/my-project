import { Genre } from '../../../types';

export type GenresState = {
  genres: Genre[],
  error: string | null,
};

export enum GenresActionType {
  GENRES_FETCH_SUCCESS = 'GENRES_FETCH_SUCCESS',
  GENRES_FETCH_FAILURE = 'GENRES_FETCH_FAILURE',
}

export type GenresFetchSuccessAction = {
  type: GenresActionType.GENRES_FETCH_SUCCESS,
  payload: { genres: Genre[] }
};

export type GenresFetchFailureAction = {
  type: GenresActionType.GENRES_FETCH_FAILURE,
  payload: { error: string },
};

export type GenresAction = GenresFetchSuccessAction | GenresFetchFailureAction;

import { Artist } from '../../../types';

export type ArtistsState = {
  actors: Artist[],
  directors: Artist[],
  favoredActors: Artist[],
  favoredDirectors: Artist[],
  error: string | null,
  success: string | null,
  loading: boolean,
};

export type ArtistsPageType = 'actor' | 'director';

export enum ArtistsActionType {
  ARTISTS_LOADING = 'ARTISTS_LOADING',
  ARTISTS_FETCH_SUCCESS = 'ARTISTS_FETCH_SUCCESS',
  ARTISTS_FETCH_FAILURE = 'ARTISTS_FETCH_FAILURE',
  ARTISTS_FAVORED_FETCH_SUCCESS = 'ARTISTS_FAVORED_FETCH_SUCCESS',
  ARTISTS_CLEAR_SUCCESS = 'ARTISTS_CLEAR_SUCCESS',
  ARTISTS_CLEAR_ERROR = 'ARTISTS_CLEAR_ERROR',
  ARTISTS_CREATE_SUCCESS = 'ARTISTS_CREATE_SUCCESS',
  ARTISTS_CREATE_FAILURE = 'ARTISTS_CREATE_FAILURE',
  ARTISTS_DELETE_SUCCESS = 'ARTISTS_DELETE_SUCCESS',
  ARTISTS_DELETE_FAILURE = 'ARTISTS_DELETE_FAILURE',
}

export type ArtistsLoadingAction = {
  type: ArtistsActionType.ARTISTS_LOADING,
};
export type ArtistsClearErrorAction = {
  type: ArtistsActionType.ARTISTS_CLEAR_ERROR,
};

export type ArtistsClearSuccessAction = {
  type: ArtistsActionType.ARTISTS_CLEAR_SUCCESS,
};

export type ArtistsFetchSuccessAction = {
  type: ArtistsActionType.ARTISTS_FETCH_SUCCESS,
  payload: { artists: Artist[], type: ArtistsPageType }
};

export type ArtistsFetchFailureAction = {
  type: ArtistsActionType.ARTISTS_FETCH_FAILURE,
  payload: { error: string, type: ArtistsPageType },
};

export type ArtistsFavoredFetchSuccessAction = {
  type: ArtistsActionType.ARTISTS_FAVORED_FETCH_SUCCESS,
  payload: { favoredArtists: Artist[], type: ArtistsPageType }
};

export type ArtistsCreateSuccessAction = {
  type: ArtistsActionType.ARTISTS_CREATE_SUCCESS,
  payload: { success: string }
};

export type ArtistsCreateFailureAction = {
  type: ArtistsActionType.ARTISTS_CREATE_FAILURE,
  payload: { error: string }
};

export type ArtistsDeleteSuccessAction = {
  type: ArtistsActionType.ARTISTS_DELETE_SUCCESS,
  payload: { success: string }
};

export type ArtistsDeleteFailureAction = {
  type: ArtistsActionType.ARTISTS_DELETE_FAILURE,
  payload: { error: string }
};

export type ArtistsAction = ArtistsLoadingAction | ArtistsClearErrorAction | ArtistsClearSuccessAction | ArtistsFetchSuccessAction | ArtistsFetchFailureAction | ArtistsFavoredFetchSuccessAction | ArtistsCreateSuccessAction | ArtistsCreateFailureAction | ArtistsDeleteSuccessAction | ArtistsDeleteFailureAction;

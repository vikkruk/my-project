import { Artist } from '../../../types';

export type ArtistsState = {
  actors: Artist[],
  directors: Artist[],
  favoredActors: Artist[],
  favoredDirectors: Artist[],
  error: string | null,
};

export type ArtistsPageType = 'actor' | 'director';

export enum ArtistsActionType {
  ARTISTS_FETCH_SUCCESS = 'ARTISTS_FETCH_SUCCESS',
  ARTISTS_FETCH_FAILURE = 'ARTISTS_FETCH_FAILURE',
  ARTISTS_FAVORED_FETCH_SUCCESS = 'ARTISTS_FAVORED_FETCH_SUCCESS',
  ARTISTS_ADD_FAVORED = 'ARTISTS_ADD_FAVORED',
  ARTISTS_DELETE_FAVORED = 'ARTISTS_DELETE_FAVORED',
}

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

export type ArtistsAction = ArtistsFetchSuccessAction | ArtistsFetchFailureAction | ArtistsFavoredFetchSuccessAction;

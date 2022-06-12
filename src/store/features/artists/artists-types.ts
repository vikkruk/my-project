import { Artist, Favored } from '../../../types';

export type ArtistsState = {
  actors: Artist[],
  directors: Artist[],
  favoredActors: Favored[],
  favoredDirectors: Favored[],
  error: string | null,
};

export type ArtistsTypeType = 'actor' | 'director';

export enum ArtistsActionType {
  ARTISTS_FETCH_SUCCESS = 'ARTISTS_FETCH_SUCCESS',
  ARTISTS_FETCH_FAILURE = 'ARTISTS_FETCH_FAILURE',
  ARTISTS_FAVORED_FETCH_SUCCESS = 'ARTISTS_FAVORED_FETCH_SUCCESS',
  ARTISTS_ADD_FAVORED = 'ARTISTS_ADD_FAVORED',
  ARTISTS_DELETE_FAVORED = 'ARTISTS_DELETE_FAVORED',
}

export type ArtistsFetchSuccessAction = {
  type: ArtistsActionType.ARTISTS_FETCH_SUCCESS,
  payload: { artists: Artist[], type: ArtistsTypeType }
};

export type ArtistsFetchFailureAction = {
  type: ArtistsActionType.ARTISTS_FETCH_FAILURE,
  payload: { error: string, type: ArtistsTypeType },
};

export type ArtistsFavoredFetchSuccessAction = {
  type: ArtistsActionType.ARTISTS_FAVORED_FETCH_SUCCESS,
  payload: { favoredArtists: Favored[], type: ArtistsTypeType }
};

export type ArtistsAddFavoredAction = {
  type: ArtistsActionType.ARTISTS_ADD_FAVORED,
  payload: { artistId: string, type: ArtistsTypeType },
};

export type ArtistsDeleteFavoredAction = {
  type: ArtistsActionType.ARTISTS_DELETE_FAVORED,
  payload: { artistId: string, type: ArtistsTypeType }
};

export type ArtistsAction = ArtistsFetchSuccessAction | ArtistsFetchFailureAction | ArtistsAddFavoredAction | ArtistsDeleteFavoredAction | ArtistsFavoredFetchSuccessAction;

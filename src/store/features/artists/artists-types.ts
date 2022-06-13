import { Artist, FavoredArtist } from '../../../types';

export type ArtistsState = {
  actors: Artist[],
  directors: Artist[],
  favoredActors: FavoredArtist[],
  favoredDirectors: FavoredArtist[],
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
  payload: { favoredArtists: FavoredArtist[], type: ArtistsPageType }
};

export type ArtistsAddFavoredAction = {
  type: ArtistsActionType.ARTISTS_ADD_FAVORED,
  payload: { artistId: string, type: ArtistsPageType },
};

export type ArtistsDeleteFavoredAction = {
  type: ArtistsActionType.ARTISTS_DELETE_FAVORED,
  payload: { artistId: string, type: ArtistsPageType }
};

export type ArtistsAction = ArtistsFetchSuccessAction | ArtistsFetchFailureAction | ArtistsAddFavoredAction | ArtistsDeleteFavoredAction | ArtistsFavoredFetchSuccessAction;

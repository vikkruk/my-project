import { Dispatch } from 'redux';
import { Artist, FavoredArtist, User } from '../../../types';
import { AppAction } from '../../redux-types';
import {
  ArtistsActionType,
  ArtistsAddFavoredAction,
  ArtistsDeleteFavoredAction,
  ArtistsFetchFailureAction,
  ArtistsFetchSuccessAction,
  ArtistsFavoredFetchSuccessAction,
  ArtistsPageType,
} from './artists-types';
import { getLocalStorage } from '../../../helpers/local-storage-helpers';
import ArtistsService from '../../../services/artists-service';
import { ApiServiceBE } from '../../../services/api-service';

export const createArtistsFetchSuccess = (artists: Artist[], type: ArtistsPageType): ArtistsFetchSuccessAction => ({
  type: ArtistsActionType.ARTISTS_FETCH_SUCCESS,
  payload: { artists, type },
});

export const createArtistsFetchFailure = (error: string, type: ArtistsPageType): ArtistsFetchFailureAction => ({
  type: ArtistsActionType.ARTISTS_FETCH_FAILURE,
  payload: { error, type },
});

export const createArtistsFavoredFetchSuccess = (favoredArtists: Artist[], type: ArtistsPageType): ArtistsFavoredFetchSuccessAction => ({
  type: ArtistsActionType.ARTISTS_FAVORED_FETCH_SUCCESS,
  payload: { favoredArtists, type },
});

export const createArtistsAddFavored = (artistId: string, type: ArtistsPageType): ArtistsAddFavoredAction => ({
  type: ArtistsActionType.ARTISTS_ADD_FAVORED,
  payload: { artistId, type },
});

export const createArtistsDeleteFavored = (artistId: string, type: ArtistsPageType): ArtistsDeleteFavoredAction => ({
  type: ArtistsActionType.ARTISTS_DELETE_FAVORED,
  payload: { artistId, type },
});

export const artistsFetchActionThunk = (type: ArtistsPageType) => async (dispatch: Dispatch<AppAction>): Promise<void> => {
  try {
    const artists = await ArtistsService.fetchArtists(type);
    dispatch(createArtistsFetchSuccess(artists, type));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    dispatch(createArtistsFetchFailure(errorMessage, type));
  }
};

export const artistsFetchFavoredActionThunk = (type: ArtistsPageType, token: string) => async (dispatch: Dispatch<AppAction>): Promise<void> => {
  try {
    const favoredArtists = await ArtistsService.fetchFavoredArtists(type, token);
    const favoredArtistsPure = favoredArtists.map((favoredArtist) => favoredArtist.artist);
    dispatch(createArtistsFavoredFetchSuccess(favoredArtistsPure, type));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    dispatch(createArtistsFetchFailure(errorMessage, type));
  }
};

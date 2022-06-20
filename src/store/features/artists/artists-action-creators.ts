import { Dispatch } from 'redux';
import { AddArtistData, Artist } from '../../../types';
import { AppAction } from '../../redux-types';
import {
  ArtistsActionType,
  ArtistsFetchFailureAction,
  ArtistsFetchSuccessAction,
  ArtistsFavoredFetchSuccessAction,
  ArtistsPageType,
  ArtistsCreateSuccessAction,
  ArtistsCreateFailureAction,
  ArtistsLoadingAction,
  ArtistsClearErrorAction,
  ArtistsClearSuccessAction,
  ArtistsDeleteSuccessAction,
  ArtistsDeleteFailureAction,
} from './artists-types';
import ArtistsService from '../../../services/artists-service';
import pause from '../../../helpers/pause';

export const artistsLoadingAction: ArtistsLoadingAction = {
  type: ArtistsActionType.ARTISTS_LOADING,
};

export const artistsClearErrorAction: ArtistsClearErrorAction = {
  type: ArtistsActionType.ARTISTS_CLEAR_ERROR,
};

export const artistsClearSuccessAction: ArtistsClearSuccessAction = {
  type: ArtistsActionType.ARTISTS_CLEAR_SUCCESS,
};

export const createArtistsFetchSuccessAction = (artists: Artist[], type: ArtistsPageType): ArtistsFetchSuccessAction => ({
  type: ArtistsActionType.ARTISTS_FETCH_SUCCESS,
  payload: { artists, type },
});

export const createArtistsFetchFailureAction = (error: string, type: ArtistsPageType): ArtistsFetchFailureAction => ({
  type: ArtistsActionType.ARTISTS_FETCH_FAILURE,
  payload: { error, type },
});

export const createArtistsFavoredFetchSuccessAction = (favoredArtists: Artist[], type: ArtistsPageType): ArtistsFavoredFetchSuccessAction => ({
  type: ArtistsActionType.ARTISTS_FAVORED_FETCH_SUCCESS,
  payload: { favoredArtists, type },
});

export const createArtistsCreateSuccessAction = (success: string): ArtistsCreateSuccessAction => ({
  type: ArtistsActionType.ARTISTS_CREATE_SUCCESS,
  payload: { success },
});

export const createArtistsCreateFailureAction = (error: string): ArtistsCreateFailureAction => ({
  type: ArtistsActionType.ARTISTS_CREATE_FAILURE,
  payload: { error },
});

export const createArtistsDeleteSuccessAction = (success: string): ArtistsDeleteSuccessAction => ({
  type: ArtistsActionType.ARTISTS_DELETE_SUCCESS,
  payload: { success },
});

export const createArtistsDeleteFailureAction = (error: string): ArtistsDeleteFailureAction => ({
  type: ArtistsActionType.ARTISTS_DELETE_FAILURE,
  payload: { error },
});

export const createArtistsFetchActionThunk = (type: ArtistsPageType, gender?: string) => async (dispatch: Dispatch<AppAction>): Promise<void> => {
  try {
    const artists = await ArtistsService.fetchArtists(type, gender);
    dispatch(createArtistsFetchSuccessAction(artists, type));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    dispatch(createArtistsFetchFailureAction(errorMessage, type));
  }
};

export const createArtistsDeleteActionThunk = (artistId: string, token: string) => async (dispatch: Dispatch<AppAction>): Promise<void> => {
  try {
    await ArtistsService.deleteArtist(artistId, token);
    dispatch(createArtistsDeleteSuccessAction);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    dispatch(createArtistsDeleteFailureAction(errorMessage));
  }
};

export const createArtistsFetchFavoredActionThunk = (type: ArtistsPageType, token: string, gender?: string) => async (dispatch: Dispatch<AppAction>): Promise<void> => {
  try {
    const favoredArtists = await ArtistsService.fetchFavoredArtists(type, token, gender);
    const favoredArtistsPure = favoredArtists.map((favoredArtist) => favoredArtist.artist);
    dispatch(createArtistsFavoredFetchSuccessAction(favoredArtistsPure, type));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    dispatch(createArtistsFetchFailureAction(errorMessage, type));
  }
};

export const createArtistsAddFavoredThunk = (artistId: string, type: ArtistsPageType, token: string) => async (dispatch: Dispatch<AppAction>): Promise<void> => {
  try {
    await ArtistsService.addFavoredArtist(artistId, type, token);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    dispatch(createArtistsFetchFailureAction(errorMessage, type));
  }
};

export const createArtistsRemoveFavoredThunk = (artistId: string, type: ArtistsPageType, token: string) => async (dispatch: Dispatch<AppAction>): Promise<void> => {
  try {
    await ArtistsService.removeFavoredArtist(artistId, type, token);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    dispatch(createArtistsFetchFailureAction(errorMessage, type));
  }
};

export const createArtistsCreateThunk = (submittedValues: AddArtistData, token: string) => async (dispatch: Dispatch<AppAction>): Promise<void> => {
  dispatch(artistsLoadingAction);
  try {
    const { artist } = await ArtistsService.createArtist(submittedValues, token);
    pause(700);
    const successMessage = `${artist.name} ${artist.surname} successfully added`;
    dispatch(createArtistsCreateSuccessAction(successMessage));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    dispatch(createArtistsCreateFailureAction(errorMessage));
  }
};

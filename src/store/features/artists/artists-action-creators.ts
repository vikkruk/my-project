import { Dispatch } from 'redux';
import { Artist, FavoredArtist, User } from '../../../types';
import { AppAction } from '../../types';
import {
  ArtistsActionType,
  ArtistsAddFavoredAction,
  ArtistsDeleteFavoredAction,
  ArtistsFetchFailureAction,
  ArtistsFetchSuccessAction,
  ArtistsFavoredFetchSuccessAction,
  ArtistsPageType,
} from './artists-types';
import ApiService from '../../../services/api-service';
import { getLocalStorage } from '../../../helpers/local-storage-helpers';

export const createArtistsFetchSuccess = (artists: Artist[], type: ArtistsPageType): ArtistsFetchSuccessAction => ({
  type: ArtistsActionType.ARTISTS_FETCH_SUCCESS,
  payload: { artists, type },
});

export const createArtistsFetchFailure = (error: string, type: ArtistsPageType): ArtistsFetchFailureAction => ({
  type: ArtistsActionType.ARTISTS_FETCH_FAILURE,
  payload: { error, type },
});

export const createArtistsFavoredFetchSuccess = (favoredArtists: FavoredArtist[], type: ArtistsPageType): ArtistsFavoredFetchSuccessAction => ({
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

export const artistsFetchAction = (type: ArtistsPageType) => async (dispatch: Dispatch<AppAction>): Promise<void> => {
  try {
    switch (type) {
      case ('actor'): {
        const { data } = await ApiService.get<Artist[]>('/people?roles_like=3');
        dispatch(createArtistsFetchSuccess(data, type));
        break;
      }
      case ('director'): {
        const { data } = await ApiService.get<Artist[]>('/people?roles_like=1');
        dispatch(createArtistsFetchSuccess(data, type));
        break;
      }
      default: break;
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    dispatch(createArtistsFetchFailure(errorMsg, type));
  }
};

export const artistsFetchFavoredAction = (type: ArtistsPageType) => (dispatch: Dispatch<AppAction>): void => {
  const user = getLocalStorage<User>('user');
  if (user !== null) {
    switch (type) {
      case ('actor'): {
        const favoredActors = user.favored.actors || [];
        dispatch(createArtistsFavoredFetchSuccess(favoredActors, type));
        break;
      }
      case ('director'): {
        const favoredDirectors = user.favored.directors || [];
        dispatch(createArtistsFavoredFetchSuccess(favoredDirectors, type));
        break;
      }

      default: break;
    }
  }
};

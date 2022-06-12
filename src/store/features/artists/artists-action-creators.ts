import { Dispatch } from 'redux';
import { Artist, Favored, User } from '../../../types';
import { AppAction } from '../../types';
import {
  ArtistsActionType,
  ArtistsAddFavoredAction,
  ArtistsDeleteFavoredAction,
  ArtistsFetchFailureAction,
  ArtistsFetchSuccessAction,
  ArtistsFavoredFetchSuccessAction,
  ArtistsTypeType,
} from './artists-types';
import ApiService from '../../../services/api-service';
import { getLocalStorage } from '../../../helpers/local-storage-helpers';

export const createArtistsFetchSuccess = (artists: Artist[], type: ArtistsTypeType): ArtistsFetchSuccessAction => ({
  type: ArtistsActionType.ARTISTS_FETCH_SUCCESS,
  payload: { artists, type },
});

export const createArtistsFetchFailure = (error: string, type: ArtistsTypeType): ArtistsFetchFailureAction => ({
  type: ArtistsActionType.ARTISTS_FETCH_FAILURE,
  payload: { error, type },
});

export const createArtistsFavoredFetchSuccess = (favoredArtists: Favored[], type: ArtistsTypeType): ArtistsFavoredFetchSuccessAction => ({
  type: ArtistsActionType.ARTISTS_FAVORED_FETCH_SUCCESS,
  payload: { favoredArtists, type },
});

export const createArtistsAddFavored = (artistId: string, type: ArtistsTypeType): ArtistsAddFavoredAction => ({
  type: ArtistsActionType.ARTISTS_ADD_FAVORED,
  payload: { artistId, type },
});

export const createArtistsDeleteFavored = (artistId: string, type: ArtistsTypeType): ArtistsDeleteFavoredAction => ({
  type: ArtistsActionType.ARTISTS_DELETE_FAVORED,
  payload: { artistId, type },
});

export const artistsFetchAction = (type: ArtistsTypeType) => async (dispatch: Dispatch<AppAction>): Promise<void> => {
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

export const artistsFetchFavoredAction = (type: ArtistsTypeType) => (dispatch: Dispatch<AppAction>): void => {
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

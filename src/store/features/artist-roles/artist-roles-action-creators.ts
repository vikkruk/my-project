import { Dispatch } from 'redux';
import { ArtistRole } from '../../../types';
import { AppAction } from '../../redux-types';
import {
  ArtistRolesFetchSuccessAction,
  ArtistRolesActionType,
  ArtistRolesFetchFailureAction,
} from './artist-roles-types';
import ArtistRolesService from '../../../services/artist-roles-service';

export const createArtistRolesFetchSuccess = (artistRoles: ArtistRole[]): ArtistRolesFetchSuccessAction => ({
  type: ArtistRolesActionType.ARTIST_ROLES_FETCH_SUCCESS,
  payload: { artistRoles },
});

export const createArtistRolesFetchFailure = (error: string): ArtistRolesFetchFailureAction => ({
  type: ArtistRolesActionType.ARTIST_ROLES_FETCH_FAILURE,
  payload: { error },
});

export const artistRolesFetchActionThunk = async (dispatch: Dispatch<AppAction>): Promise<void> => {
  try {
    const artistRoles = await ArtistRolesService.fetchArtistRoles();
    dispatch(createArtistRolesFetchSuccess(artistRoles));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    dispatch(createArtistRolesFetchFailure(errorMessage));
  }
};

import { ArtistRole } from '../../../types';

export type ArtistRolesState = {
  artistRoles: ArtistRole[],
  error: string | null,
};

export enum ArtistRolesActionType {
  ARTIST_ROLES_FETCH_SUCCESS = 'ARTIST_ROLES_FETCH_SUCCESS',
  ARTIST_ROLES_FETCH_FAILURE = 'ARTIST_ROLES_FETCH_FAILURE',
}

export type ArtistRolesFetchSuccessAction = {
  type: ArtistRolesActionType.ARTIST_ROLES_FETCH_SUCCESS,
  payload: { artistRoles: ArtistRole[] }
};

export type ArtistRolesFetchFailureAction = {
  type: ArtistRolesActionType.ARTIST_ROLES_FETCH_FAILURE,
  payload: { error: string },
};

export type ArtistRolesAction = ArtistRolesFetchSuccessAction | ArtistRolesFetchFailureAction;

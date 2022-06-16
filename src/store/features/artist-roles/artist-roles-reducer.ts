/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';
import {
  ArtistRolesState,
  ArtistRolesAction,
  ArtistRolesActionType,
} from './artist-roles-types';

const initialState: ArtistRolesState = {
  artistRoles: [],
  error: null,
};

const artistRolesReducer: Reducer<ArtistRolesState, ArtistRolesAction> = (state = initialState, action) => {
  switch (action.type) {
    case ArtistRolesActionType.ARTIST_ROLES_FETCH_SUCCESS: {
      return {
        ...state,
        artistRoles: action.payload.artistRoles,
      };
    }
    case ArtistRolesActionType.ARTIST_ROLES_FETCH_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    default: return state;
  }
};

export default artistRolesReducer;

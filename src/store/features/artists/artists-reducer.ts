/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';
import { ArtistsState, ArtistsAction, ArtistsActionType } from './artists-types';

const initialState: ArtistsState = {
  actors: [],
  directors: [],
  favoredActors: [],
  favoredDirectors: [],
  error: null,
};

const artistsReducer: Reducer<ArtistsState, ArtistsAction> = (state = initialState, action) => {
  switch (action.type) {
    case ArtistsActionType.ARTISTS_FETCH_SUCCESS: {
      if (action.payload.type === 'actor') {
        return {
          ...state,
          actors: action.payload.artists,
        };
      }
      return {
        ...state,
        directors: action.payload.artists,
      };
    }
    case ArtistsActionType.ARTISTS_FETCH_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case ArtistsActionType.ARTISTS_FAVORED_FETCH_SUCCESS: {
      if (action.payload.type === 'actor') {
        return {
          ...state,
          favoredActors: action.payload.favoredArtists,
        };
      }
      return {
        ...state,
        favoredDirectors: action.payload.favoredArtists,
      };
    }
    default: return state;
  }
};

export default artistsReducer;

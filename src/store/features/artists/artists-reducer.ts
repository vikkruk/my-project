/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';
import { v4 as createId } from 'uuid';
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

    case ArtistsActionType.ARTISTS_ADD_FAVORED: {
      if (action.payload.type === 'actor') {
        const favoredActor = state.actors.find((actor) => actor.id === action.payload.artistId);
        const alreadyFavored = state.favoredActors.find((fav) => fav.artistId === action.payload.artistId);
        if (favoredActor && !alreadyFavored) {
          const newFavoredActor = {
            id: createId(),
            artistId: action.payload.artistId,
          };
          return {
            ...state,
            favoredActors: [
              ...state.favoredActors,
              newFavoredActor,
            ],
          };
        }
      } else if (action.payload.type === 'director') {
        const favoredDirector = state.directors.find((director) => director.id === action.payload.artistId);
        const alreadyFavored = state.favoredDirectors.find((fav) => fav.artistId === action.payload.artistId);

        if (favoredDirector && !alreadyFavored) {
          const newFavoredDirector = {
            id: createId(),
            artistId: action.payload.artistId,
          };
          return {
            ...state,
            favoredDirectors: [
              ...state.favoredDirectors,
              newFavoredDirector,
            ],
          };
        }
      }
      return state;
    }

    case ArtistsActionType.ARTISTS_DELETE_FAVORED: {
      if (action.payload.type === 'actor') {
        return {
          ...state,
          favoredActors: [
            ...state.favoredActors.filter((fav) => fav.artistId !== action.payload.artistId),
          ],
        };
      }
      return {
        ...state,
        favoredDirectors: [
          ...state.favoredDirectors.filter((fav) => fav.artistId !== action.payload.artistId),
        ],
      };
    }

    default: return state;
  }
};

export default artistsReducer;

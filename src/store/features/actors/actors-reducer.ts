/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';
import { v4 as createId } from 'uuid';
import { ActorsState, ActorsAction, ActorsActionType } from './actors-types';

const initialState: ActorsState = {
  actors: [],
  directors: [],
  favoredActors: [],
  favoredDirectors: [],
  error: null,
};

const actorsReducer: Reducer<ActorsState, ActorsAction> = (state = initialState, action) => {
  switch (action.type) {
    case ActorsActionType.ACTORS_FETCH_SUCCESS: {
      return {
        ...state,
        actors: action.payload.actors,
      };
    }
    case ActorsActionType.ACTORS_FETCH_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case ActorsActionType.ACTORS_FAVORED_FETCH_SUCCESS: {
      return {
        ...state,
        favoredActors: action.payload.favoredActors,
      };
    }

    case ActorsActionType.ACTORS_ADD_FAVORED: {
      const favoredActor = state.actors.find((actor) => actor.id === action.payload.actorId);
      const alreadyFavored = state.favoredActors.find((fav) => fav.artistId === action.payload.actorId);

      if (favoredActor && !alreadyFavored) {
        const newFavoredActor = {
          id: createId(),
          artistId: action.payload.actorId,
        };
        return {
          ...state,
          favoredActors: [
            ...state.favoredActors,
            newFavoredActor,
          ],
        };
      }
      return state;
    }

    case ActorsActionType.ACTORS_DELETE_FAVORED: {
      return {
        ...state,
        favoredActors: [
          ...state.favoredActors.filter((fav) => fav.artistId !== action.payload.actorId),
        ],
      };
    }

    default: return state;
  }
};

export default actorsReducer;

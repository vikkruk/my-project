/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';
import { v4 as createId } from 'uuid';
import { ActorsState, ActorsAction, ActorsActionType } from './actors-types';

const initialState: ActorsState = {
  actors: [],
  favored: [],
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
        favored: action.payload.favoredActors,
      };
    }

    case ActorsActionType.ACTORS_ADD_FAVORED: {
      const favoredActor = state.actors.find((actor) => actor.id === action.payload.actorId);
      const alreadyFavored = state.favored.find((fav) => fav.actorId === action.payload.actorId);

      if (favoredActor && !alreadyFavored) {
        const newFavoredActor = {
          id: createId(),
          actorId: action.payload.actorId,
        };
        return {
          ...state,
          favored: [
            ...state.favored,
            newFavoredActor,
          ],
        };
      }
      return state;
    }

    case ActorsActionType.ACTORS_DELETE_FAVORED: {
      return {
        ...state,
        favored: [
          ...state.favored.filter((fav) => fav.actorId !== action.payload.actorId),
        ],
      };
    }

    default: return state;
  }
};

export default actorsReducer;

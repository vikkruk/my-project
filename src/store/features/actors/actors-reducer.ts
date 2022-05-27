/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';
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

    case ActorsActionType.ACTORS_ADD_FAVORED: {
      const favoredActor = state.actors.find((actor) => actor.id === action.payload.actorId);
      const alreadyFavored = state.favored.find((fav) => fav.id === action.payload.actorId);
      if (favoredActor && !alreadyFavored) {
        return {
          ...state,
          favored: [
            ...state.favored,
            { id: action.payload.actorId },
          ],
        };
      }
      return state;
    }

    case ActorsActionType.ACTORS_DELETE_FAVORED: {
      return {
        ...state,
        favored: [
          ...state.favored.filter((fav) => fav.id !== action.payload.actorId),
        ],
      };
    }

    default: return state;
  }
};

export default actorsReducer;

import { Actor } from '../../../types';

export type Favored = {
  id: string,
};

export type ActorsState = {
  actors: Actor[],
  favored: Favored[],
  error: string | null,
};

export enum ActorsActionType {
  ACTORS_FETCH_SUCCESS = 'ACTORS_FETCH_SUCCESS',
  ACTORS_FETCH_FAILURE = 'ACTORS_FETCH_FAILURE',
  ACTORS_ADD_FAVORED = 'ACTORS_ADD_FAVORED',
  ACTORS_DELETE_FAVORED = 'ACTORS_DELETE_FAVORED',
}

export type ActorsFetchSuccessAction = {
  type: ActorsActionType.ACTORS_FETCH_SUCCESS,
  payload: { actors: Actor[] }
};

export type ActorsFetchFailureAction = {
  type: ActorsActionType.ACTORS_FETCH_FAILURE,
  payload: { error: string },
};

export type ActorsAddFavoredAction = {
  type: ActorsActionType.ACTORS_ADD_FAVORED,
  payload: { actorId: string },
};

export type ActorsDeleteFavoredAction = {
  type: ActorsActionType.ACTORS_DELETE_FAVORED,
  payload: { actorId: string }
};

export type ActorsAction = ActorsFetchSuccessAction | ActorsFetchFailureAction | ActorsAddFavoredAction | ActorsDeleteFavoredAction;

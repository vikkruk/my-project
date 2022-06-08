import { Artist, Favored } from '../../../types';

export type ActorsState = {
  actors: Artist[],
  favored: Favored[],
  error: string | null,
};

export enum ActorsActionType {
  ACTORS_FETCH_SUCCESS = 'ACTORS_FETCH_SUCCESS',
  ACTORS_FETCH_FAILURE = 'ACTORS_FETCH_FAILURE',
  ACTORS_FAVORED_FETCH_SUCCESS = 'ACTORS_FAVORED_FETCH_SUCCESS',
  ACTORS_ADD_FAVORED = 'ACTORS_ADD_FAVORED',
  ACTORS_DELETE_FAVORED = 'ACTORS_DELETE_FAVORED',
}

export type ActorsFetchSuccessAction = {
  type: ActorsActionType.ACTORS_FETCH_SUCCESS,
  payload: { actors: Artist[] }
};

export type ActorsFetchFailureAction = {
  type: ActorsActionType.ACTORS_FETCH_FAILURE,
  payload: { error: string },
};

export type ActorsFavoredFetchSuccessAction = {
  type: ActorsActionType.ACTORS_FAVORED_FETCH_SUCCESS,
  payload: { favoredActors: Favored[] }
};

export type ActorsAddFavoredAction = {
  type: ActorsActionType.ACTORS_ADD_FAVORED,
  payload: { actorId: string },
};

export type ActorsDeleteFavoredAction = {
  type: ActorsActionType.ACTORS_DELETE_FAVORED,
  payload: { actorId: string }
};

export type ActorsAction = ActorsFetchSuccessAction | ActorsFetchFailureAction | ActorsAddFavoredAction | ActorsDeleteFavoredAction | ActorsFavoredFetchSuccessAction;

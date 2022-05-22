import { Actor } from '../../../types';

export type Favored = {
  id: string,
};

export type ActorsState = {
  actors: Actor[],
  favored: Favored[],
  error: string | null,
};

export type ActorsFetchSuccessAction = {
  type: 'ACTORS_FETCH_SUCCESS',
  payload: { actors: Actor[] }
};

export type ActorsFetchFailureAction = {
  type: 'ACTORS_FETCH_FAILURE',
  payload: { error: string },
};

export type ActorsAddFavoredAction = {
  type: 'ACTORS_ADD_FAVORED',
  payload: { actorId: string },
};

export type ActorsDeleteFavoredAction = {
  type: 'ACTORS_DELETE_FAVORED',
  payload: { actorId: string }
};

export type ActorsAction = ActorsFetchSuccessAction | ActorsFetchFailureAction | ActorsAddFavoredAction | ActorsDeleteFavoredAction;

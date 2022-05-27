import axios from 'axios';
import { Dispatch } from 'redux';
import { Actor } from '../../../types';
import { AppAction } from '../../types';
import {
  ActorsActionType,
  ActorsAddFavoredAction,
  ActorsDeleteFavoredAction,
  ActorsFetchFailureAction,
  ActorsFetchSuccessAction,
} from './actors-types';

export const createActorsFetchSuccess = (actors: Actor[]): ActorsFetchSuccessAction => ({
  type: ActorsActionType.ACTORS_FETCH_SUCCESS,
  payload: { actors },
});

export const createActorsFetchFailure = (error: string): ActorsFetchFailureAction => ({
  type: ActorsActionType.ACTORS_FETCH_FAILURE,
  payload: { error },
});

export const createActorsAddFavored = (actorId: string): ActorsAddFavoredAction => ({
  type: ActorsActionType.ACTORS_ADD_FAVORED,
  payload: { actorId },
});

export const createActorsDeleteFavored = (actorId: string): ActorsDeleteFavoredAction => ({
  type: ActorsActionType.ACTORS_DELETE_FAVORED,
  payload: { actorId },
});

export const actorsFetchAction = async (dispatch: Dispatch<AppAction>): Promise<void> => {
  try {
    const { data } = await axios.get('http://localhost:8000/actors');
    dispatch(createActorsFetchSuccess(data));
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    dispatch(createActorsFetchFailure(errorMsg));
  }
};

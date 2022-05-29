import { Dispatch } from 'redux';
import { Actor, Favored, User } from '../../../types';
import { AppAction } from '../../types';
import {
  ActorsActionType,
  ActorsAddFavoredAction,
  ActorsDeleteFavoredAction,
  ActorsFetchFailureAction,
  ActorsFetchSuccessAction,
  ActorsFavoredFetchSuccessAction,
} from './actors-types';
import ApiService from '../../../services/api-service';
import { getLocalStorage } from '../../../helpers/local-storage-helpers';

export const createActorsFetchSuccess = (actors: Actor[]): ActorsFetchSuccessAction => ({
  type: ActorsActionType.ACTORS_FETCH_SUCCESS,
  payload: { actors },
});

export const createActorsFetchFailure = (error: string): ActorsFetchFailureAction => ({
  type: ActorsActionType.ACTORS_FETCH_FAILURE,
  payload: { error },
});

export const createActorsFavoredFetchSuccess = (favoredActors: Favored[]): ActorsFavoredFetchSuccessAction => ({
  type: ActorsActionType.ACTORS_FAVORED_FETCH_SUCCESS,
  payload: { favoredActors },
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
    const { data } = await ApiService.get('/actors');
    dispatch(createActorsFetchSuccess(data));
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    dispatch(createActorsFetchFailure(errorMsg));
  }
};

export const actorsFetchFavoredAction = (dispatch: Dispatch<AppAction>): void => {
  const user = getLocalStorage<User>('user');
  if (user !== null) {
    const favoredActors = user.favoredActors || [];
    dispatch(createActorsFavoredFetchSuccess(favoredActors));
  }
};

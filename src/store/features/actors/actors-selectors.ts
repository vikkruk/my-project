import { RootState } from '../../types';

export const selectActorsFavored = (state: RootState) => state.actors.favoredActors;

export const selectActorsAll = (state: RootState) => state.actors.actors;

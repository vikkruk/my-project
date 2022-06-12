import { RootState } from '../../types';

export const selectActorsFavored = (state: RootState) => state.artists.favoredActors;
export const selectDirectorsFavored = (state: RootState) => state.artists.favoredDirectors;

export const selectActorsAll = (state: RootState) => state.artists.actors;
export const selectDirectorsAll = (state: RootState) => state.artists.directors;

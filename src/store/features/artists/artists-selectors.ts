import { RootState } from '../../redux-types';

export const selectArtistsActorsAll = (state: RootState) => state.artists.actors;

export const selectArtistsDirectorsAll = (state: RootState) => state.artists.directors;

export const selectArtistsActorsFavored = (state: RootState) => state.artists.favoredActors;

export const selectArtistsDirectorsFavored = (state: RootState) => state.artists.favoredDirectors;

export const selectArtists = (state: RootState) => state.artists;

import { Artist } from './artist';
import { Genre } from './genre';

export type Movie = {
  id: string,
  title: string,
  year: string,
  poster: string,
  directors: Artist[],
  actors: Artist[],
  genres: Genre[]
};

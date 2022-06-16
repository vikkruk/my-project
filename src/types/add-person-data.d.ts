import { ArtistData } from './artist-data';

export type AddPersonDataValues = ArtistData & {
  roles: string[],
};

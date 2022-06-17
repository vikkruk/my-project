import { Artist } from './artist';

export type AddArtistData = Omit<Artist, 'id'>;

import { FavoredArtist } from './favored-artist';

export type User = {
  id: string,
  email: string,
  nickname: string,
  role: 'user' | 'admin',
  createdAt: string,
  updatedAt: string,
  favored: {
    actors: FavoredArtist[],
    directors: FavoredArtist[],
  },
  avatar?: string,
};

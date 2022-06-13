import FavoredArtist from './favored-artist';

type User = {
  id: string,
  email: string,
  nickname: string,
  role: 'user' | 'admin',
  avatar?: string,
  createdAt: string,
  updatedAt: string,
  favored: {
    actors: FavoredArtist[],
    directors: FavoredArtist[],
  },
};

export default User;

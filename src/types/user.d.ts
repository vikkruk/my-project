import Favored from './favored';

type User = {
  id: string,
  nickname?: string,
  email: string,
  avatar?: string,
  favored?: {
    actors: Favored[],
    directors: Favored[],
  },
};

export default User;

import Favored from './favored';

type User = {
  id: string,
  nickname?: string,
  email: string,
  avatar?: string,
  favoredActors?: Favored[],
};

export default User;

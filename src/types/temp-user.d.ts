type TemporaryUser = {
  id: string,
  nickname?: string,
  email: string,
  password: string,
  avatar?: string,
  roles: string[],
  favoredActors?: Favored[],
};

export default TemporaryUser;

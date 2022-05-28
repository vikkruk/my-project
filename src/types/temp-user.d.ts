type TemporaryUser = {
  id: string,
  nickname?: string,
  email: string,
  password: string,
  avatar?: string,
  favoredActors?: Favored[],
};

export default TemporaryUser;

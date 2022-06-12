type TemporaryUser = {
  id: string,
  nickname?: string,
  email: string,
  password: string,
  avatar?: string,
  roles: string[],
  favored: {
    actors: Favored[],
    directors: Favored[]
  }
};

export default TemporaryUser;

import { Actor } from '../types';

export type Favored = {
  id: string,
  name: string,
  surname: string,
};

export type State = {
  actors: Actor[],
  favored: Favored[],
};

export type Action = {
  type: string,
  payload: any,
};

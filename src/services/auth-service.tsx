import { AxiosError } from 'axios';
import {
  Credentials, User, UserRole,
} from '../types';
import ApiService, { ApiServiceBE, isResponseError } from './api-service';

export type AuthResponseBody = {
  user: User,
  token: string,
};
export type AuthPromise = (credentials: Credentials) => Promise<AuthResponseBody>;

namespace AuthService {

  export const login: AuthPromise = async (credentials: Credentials) => {
    try {
      const response = await ApiServiceBE.post<AuthResponseBody>('/api/auth/login', credentials);
      return response.data;
    } catch (error) {
      if (isResponseError(error)) {
        throw new Error(error.response.data.error);
      }
        throw (error);
    }
    // if (user.roles.includes(adminRoleId)) {
    //   return {
    //     id: user.id,
    //     nickname: user.nickname,
    //     email: user.email,
    //     avatar: user.avatar,
    //     roles: ['0'],
    //     favored: user.favored,
    //   };
    // }
    // return {
    //   id: user.id,
    //   nickname: user.nickname,
    //   email: user.email,
    //   avatar: user.avatar,
    //   roles: [],
    //   favored: user.favored,
    // };
  };

  export const register: AuthPromise = async ({ email, password }) => {
throw new Error('Testuojames, neskubam');
};
}
export default AuthService;

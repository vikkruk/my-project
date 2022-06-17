import { Credentials, User, UserUpdateValues } from '../types';
import ApiService, { handleError } from './api-service';

export type AuthResponseBody = {
  user: User,
  token: string,
};

namespace AuthService {

  export const login = async (credentials: Credentials): Promise<AuthResponseBody> => {
    try {
      const response = await ApiService.post<AuthResponseBody>('/api/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error(handleError(error));
    }
  };

  export const register = async (credentials: Credentials): Promise<AuthResponseBody> => {
    try {
      const response = await ApiService.post<AuthResponseBody>('/api/auth/register', credentials);
      return response.data;
    } catch (error) {
      throw new Error(handleError(error));
    }
  };

  export const authenticate = async (token: string): Promise<AuthResponseBody> => {
    try {
      const response = await ApiService
        .post<AuthResponseBody>('/api/auth/authenticate', {}, {
          headers: {
            Authorization: token,
          },
        });
      return response.data;
    } catch (error) {
      throw new Error(handleError(error));
    }
  };

  export const checkAvailability = async (value: string, type: string): Promise<boolean> => {
    try {
      const response = await ApiService
        .get<{ available: boolean }>(`/api/auth/check-availability?value=${value}&type=${type}`);
      return response.data.available;
    } catch (error) {
      throw new Error(handleError(error));
    }
  };

  export const updateUser = async (updateValues: UserUpdateValues, token: string): Promise<AuthResponseBody> => {
    try {
      const response = await ApiService.patch<AuthResponseBody>('/api/auth/update-user', updateValues, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(handleError(error));
    }
  };
}

export default AuthService;

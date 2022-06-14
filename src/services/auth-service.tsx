import { Credentials, User } from '../types';
import ApiService, { ApiServiceBE, handleError, isResponseError } from './api-service';

export type AuthResponseBody = {
  user: User,
  token: string,
};

namespace AuthService {

  export const login = async (credentials: Credentials): Promise<AuthResponseBody> => {
    try {
      const response = await ApiServiceBE.post<AuthResponseBody>('/api/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error(handleError(error));
    }
  };

  export const register = async (credentials: Credentials): Promise<AuthResponseBody> => {
    try {
      const response = await ApiServiceBE.post<AuthResponseBody>('/api/auth/register', credentials);
      return response.data;
    } catch (error) {
      throw new Error(handleError(error));
    }
  };

  export const authenticate = async (token: string): Promise<AuthResponseBody> => {
    try {
      const response = await ApiServiceBE
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

  export const checkEmailAvailability = async (email: string): Promise<boolean> => {
    try {
      const response = await ApiServiceBE
      .get<{ available: boolean }>(`/api/auth/check-email?email=${email}`);
      return response.data.available;
    } catch (error) {
       throw new Error(handleError(error));
    }
  };
}

export default AuthService;

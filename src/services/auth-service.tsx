import { Credentials, User } from '../types';
import ApiService, { ApiServiceBE, isResponseError } from './api-service';

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
      if (isResponseError(error)) {
        throw new Error(error.response.data.error);
      }
        throw (error);
    }
  };

  export const register = async (credentials: Credentials): Promise<AuthResponseBody> => {
    try {
      const response = await ApiServiceBE.post<AuthResponseBody>('/api/auth/register', credentials);
      return response.data;
    } catch (error) {
      if (isResponseError(error)) {
        throw new Error(error.response.data.error);
      }
        throw (error);
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
          if (isResponseError(error)) {
        throw new Error(error.response.data.error);
      }
        throw (error);
    }
  };

  export const checkEmailAvailability = async (email: string): Promise<boolean> => {
    try {
      const response = await ApiServiceBE
      .get<{ available: boolean }>(`/api/auth/check-email?email=${email}`);
      return response.data.available;
    } catch (error) {
       if (isResponseError(error)) {
        throw new Error(error.response.data.error);
      }
        throw (error);
    }
  };
}

export default AuthService;

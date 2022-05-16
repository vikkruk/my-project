import axios from 'axios';

import { Credentials, TemporaryUser, User } from '../types';

export type AuthPromise = (credentials: Credentials) => Promise<User>;

namespace AuthService {

  export const login: AuthPromise = async ({ email, password }) => {
    const { data: users } = await axios.get<TemporaryUser[]>(`http://localhost:8000/users?email=${email}`);

    if (users.length === 0) {
      throw new Error('User with this email does not exist');
    }
    const [user] = users;

    if (user.password !== password) {
      throw new Error('Password you entered is not correct');
    }

    return {
      id: user.id,
      nickname: user.nickname,
      email: user.email,
      avatar: user.avatar,
    };
  };

  export const register: AuthPromise = async ({ email, password }) => {
    const { data: allUsers } = await axios.get<User[]>('http://localhost:8000/users');
    const userWithThisEmail = allUsers.filter((user) => user.email === email);

    if (userWithThisEmail.length > 0) {
      throw new Error('User with this email already exists');
    }
    const { data: newUser } = await axios.post<TemporaryUser>('http://localhost:8000/users', { email, password });

    return {
      id: newUser.id,
      email: newUser.email,
    };
  };

}

export default AuthService;

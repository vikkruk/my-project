import {
  Credentials, TemporaryUser, User, UserRole,
} from '../../../types';
import ApiService from '../../../services/api-service';

export type AuthPromise = (credentials: Credentials) => Promise<User & { roles?: string[] }>;

namespace AuthService {

  export const login: AuthPromise = async ({ email, password }) => {
    const { data: users } = await ApiService.get<TemporaryUser[]>(`/users?email=${email}`);
    const { data: roles } = await ApiService.get<UserRole[]>('/userRoles');
    const adminRoleId = roles.filter((role) => role.title === 'admin')[0].id;

    if (users.length === 0) {
      throw new Error('User with this email does not exist');
    }
    const [user] = users;

    if (user.password !== password) {
      throw new Error('Password you entered is not correct');
    }

    if (user.roles.includes(adminRoleId)) {
      return {
        id: user.id,
        nickname: user.nickname,
        email: user.email,
        avatar: user.avatar,
        roles: ['0'],
        favoredActors: user.favoredActors,
      };
    }
    return {
      id: user.id,
      nickname: user.nickname,
      email: user.email,
      avatar: user.avatar,
      admin: false,
      roles: [],
      favoredActors: user.favoredActors,
    };
  };

  export const register: AuthPromise = async ({ email, password }) => {
    const { data: allUsers } = await ApiService.get<User[]>('/users');
    const userWithThisEmail = allUsers.filter((user) => user.email === email);

    if (userWithThisEmail.length > 0) {
      throw new Error('User with this email already exists');
    }
    const { data: newUser } = await ApiService.post<TemporaryUser>('/users', { email, password });

    return {
      id: newUser.id,
      email: newUser.email,
      roles: ['1'],
    };
  };

}

export default AuthService;

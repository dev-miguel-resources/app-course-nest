import { User } from '../roots/user';

// design pattern: facade
export interface UserRepository {
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByRefreshToken(refreshToken: string): Promise<User>;
  findById(id: string): Promise<User>;
  list(): Promise<User[]>;
  listByPage(page: number, pageSize: number): Promise<User[]>;
}

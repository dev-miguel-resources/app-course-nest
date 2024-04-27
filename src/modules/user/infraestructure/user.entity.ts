import { Role } from '../domain/entitities/role';

export class UserEntity {
  id: string;
  fullname: string;
  email: string;
  password: string;
  image: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  roles: Role[];
}

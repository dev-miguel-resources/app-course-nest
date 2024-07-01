//import { UserRepository } from '../domain/repositories/user.repository';
import { Repository } from 'typeorm';
import { UserRepository } from '../domain/repositories/user.repository';
import { User } from '../domain/roots/user';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './user.entity';
import { Inject } from '@nestjs/common';

export class UserInfraestructure implements UserRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly repository: Repository<UserEntity>,
  ) {}

  async save(user: User): Promise<User> {
    const userEntity = UserDto.fromDomainToData(user) as UserEntity;
    await this.repository.save(userEntity);
    return user;
  }

  findByEmail(email: string): Promise<User> {
    throw new Error('Method Not implemented');
  }

  findByRefreshToken(refreshToken: string): Promise<User> {
    throw new Error('Method Not implemented');
  }

  findById(id: string): Promise<User> {
    throw new Error('Method Not implemented');
  }

  list(): Promise<User[]> {
    throw new Error('Method Not implemented');
  }

  listByPage(page: number, pageSize: number): Promise<User[]> {
    throw new Error('Method Not implemented');
  }

  delete() {
    throw new Error('Method Not implemented');
  }
}

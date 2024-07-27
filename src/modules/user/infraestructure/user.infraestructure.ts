//import { UserRepository } from '../domain/repositories/user.repository';
import { IsNull, Repository } from 'typeorm';
import { UserRepository } from '../domain/repositories/user.repository';
import { User } from '../domain/roots/user';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './user.entity';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
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

  async list(): Promise<User[]> {
    const users = await this.repository.find({
      where: { deletedAt: IsNull() },
    });
    return UserDto.fromDataToDomain(users) as User[];
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { deletedAt: IsNull(), id },
    });
    return UserDto.fromDataToDomain(user) as User;
  }

  findByEmail(email: string): Promise<User> {
    throw new Error('Method Not implemented');
  }

  findByRefreshToken(refreshToken: string): Promise<User> {
    throw new Error('Method Not implemented');
  }

  listByPage(page: number, pageSize: number): Promise<User[]> {
    throw new Error('Method Not implemented');
  }

  delete() {
    throw new Error('Method Not implemented');
  }
}

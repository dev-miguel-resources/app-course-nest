import { Repository } from 'typeorm';
import { Role } from '../domain/role';
import { RoleEntity } from './entities/role.entity';
import { Inject, Injectable } from '@nestjs/common';
import { RoleDto } from './dtos/role.dto';
import { RoleRepository } from '../domain/repositories/role.repository';

@Injectable()
export class RoleInfraestructure implements RoleRepository {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private readonly repository: Repository<RoleEntity>,
  ) {}

  async list(): Promise<Role[]> {
    const result = await this.repository.find();
    return RoleDto.fromDataToDomain(result) as Role[];
  }
}

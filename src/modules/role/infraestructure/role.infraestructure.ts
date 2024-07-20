import { Repository } from 'typeorm';
import { Role } from '../domain/role';
import { RoleEntity } from './entities/role.entity';
import { Inject } from '@nestjs/common';
import { RoleDto } from './dtos/role.dto';

export class RoleInfraestructure implements RoleInfraestructure {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private readonly repository: Repository<RoleEntity>,
  ) {}

  async list(): Promise<Role[]> {
    const result = await this.repository.find();
    return RoleDto.fromDataToDomain(result) as Role[];
  }
}

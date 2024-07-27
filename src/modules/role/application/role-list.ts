import { Inject, Injectable } from '@nestjs/common';
import { RoleRepository } from '../domain/repositories/role.repository';
import { RoleInfraestructure } from '../infraestructure/role.infraestructure';

@Injectable()
export class RoleList {
  constructor(
    // nest.js solicita saber quien le dio vida al contrato
    @Inject(RoleInfraestructure)
    private readonly roleRepository: RoleRepository,
  ) {}

  async list() {
    const roleInserted = await this.roleRepository.list();
    return roleInserted;
  }
}

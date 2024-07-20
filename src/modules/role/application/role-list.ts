import { RoleRepository } from '../domain/repositories/role.repository';

export class RoleList {
  constructor(private readonly roleRepository: RoleRepository) {}

  async list() {
    const roleInserted = await this.roleRepository.list();
    return roleInserted;
  }
}

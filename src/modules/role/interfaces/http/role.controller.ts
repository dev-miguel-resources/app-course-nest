import { Controller, Get } from '@nestjs/common';
import { RoleList } from '../../application/role-list';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleList: RoleList) {}

  @Get()
  async list() {
    const result = await this.roleList.list();
    return result;
  }
}

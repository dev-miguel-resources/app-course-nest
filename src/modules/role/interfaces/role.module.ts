import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/infraestructure/database/database.module';
import { RoleController } from './http/role.controller';
import { roleProviders } from '../infraestructure/providers/role.provider';
import { RoleList } from '../application/role-list';
import { RoleInfraestructure } from '../infraestructure/role.infraestructure';

const applications = [RoleList];
const infra = [RoleInfraestructure];

@Module({
  imports: [DatabaseModule],
  controllers: [RoleController],
  providers: [...roleProviders, ...applications, ...infra],
})
export class RoleModule {}

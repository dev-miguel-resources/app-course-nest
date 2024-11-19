import { Module } from '@nestjs/common';
import { UserCreate } from '../../application/user.create';
import { UserList } from '../../application/user.list';
import { UserGetOne } from '../../application/user.get.one';
import { UserInfraestructure } from '../user.infraestructure';
import { DatabaseModule } from '../../../../core/infraestructure/database/database.module';
import { UserController } from './http/user.controller';
import { userProviders } from '../providers/user.provider';

const applications = [UserCreate, UserList, UserGetOne];
const infra = [UserInfraestructure];
@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, ...applications, ...infra],
  exports: [UserInfraestructure],
})
export class UserModule {}

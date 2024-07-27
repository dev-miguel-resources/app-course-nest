import { Module } from '@nestjs/common';
import { UserController } from './http/user.controller';
import { DatabaseModule } from 'src/core/infraestructure/database/database.module';
import { userProviders } from '../providers/user.provider';
import { UserCreate } from '../../application/user.create';
import { UserInfraestructure } from '../user.infraestructure';
import { UserGetOne } from '../../application/user.get.one';
import { UserList } from '../../application/user.list';

const applications = [UserCreate, UserGetOne, UserList];
const infra = [UserInfraestructure];

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, ...applications, ...infra],
})
export class UserModule {}

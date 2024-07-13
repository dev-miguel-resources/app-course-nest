import { Module } from '@nestjs/common';
import { UserController } from './http/user.controller';
import { DatabaseModule } from 'src/core/infraestructure/database/database.module';
import { userProviders } from '../providers/user.provider';
import { UserCreate } from '../../application/user-create';
import { UserInfraestructure } from '../user.infraestructure';

const applications = [UserCreate];
const infra = [UserInfraestructure];

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, ...applications, ...infra],
})
export class UserModule {}

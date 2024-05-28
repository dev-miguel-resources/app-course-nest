import { Module } from '@nestjs/common';
import { UserController } from './http/user.controller';
import { DatabaseModule } from 'src/core/infraestructure/database/database.module';

@Module({
  providers: [DatabaseModule],
  controllers: [UserController],
})
export class UserModule {}

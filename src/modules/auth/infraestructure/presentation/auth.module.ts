// esto por definir
import { Module } from '@nestjs/common';

import { UserModule } from 'src/modules/user/infraestructure/presentation/user.module';
import { AuthApplication } from '../../application/auth.application';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthApplication],
  imports: [UserModule],
})
export class AuthModule {}

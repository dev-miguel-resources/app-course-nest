import { Body, Controller, Post } from '@nestjs/common';

import { AuthApplication } from '../../application/auth.application';
import { Auth } from '../../domain/auth';
import { AuthLoginDto } from './dtos/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly application: AuthApplication) {}

  @Post('/login')
  async login(@Body() body: AuthLoginDto) {
    const { email, password } = body;
    const auth = new Auth(email, password);

    return await this.application.login(auth);
  }
}

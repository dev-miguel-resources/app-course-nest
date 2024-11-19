import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { TokenService } from '../../../core/domain/services/token.service';
import { Crypt } from 'src/core/infraestructure/presentation/services/crypt.service';
import { UserRepository } from '../../../modules/user/domain/repositories/user.repository';
import { UserInfraestructure } from 'src/modules/user/infraestructure/user.infraestructure';
import { Auth } from '../domain/auth';
import { AuthLoginResponseDto } from './dtos/auth-login-response.dto';

@Injectable()
export class AuthApplication {
  constructor(
    @Inject(UserInfraestructure) private readonly repository: UserRepository,
  ) {}

  async login(auth: Auth) {
    const user = await this.repository.findByEmail(auth.properties.email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const passwordMatch = await Crypt.compare(
      auth.properties.password,
      user.properties().password,
    );
    if (!passwordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const response = new AuthLoginResponseDto();
    response.accessToken = TokenService.generateAccessToken(user);
    response.refreshToken = TokenService.generateRefreshToken();

    return response;
  }
}

// GET -> ("/list", middlewareAuth, middlewareAuthorization, middlewareValidation, userController.list)

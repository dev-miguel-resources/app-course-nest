import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

import { AppService } from '../../../../app.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);
    if (!token) throw new UnauthorizedException('Token not found');

    try {
      const payload = jwt.verify(token, AppService.jwt_secret);
      request.user = { roles: payload.roles.map((role: any) => role.name) };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new ConflictException('Token expired');
      } else {
        throw new UnauthorizedException('Token invalid');
      }
    }

    return true;
  }

  private extractTokenFromRequest(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { RoleEnum, ROLES_KEY } from '../decorators/roles';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesAllowed = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!rolesAllowed) return true;

    const { user } = context.switchToHttp().getRequest();

    console.log('user.roles', user.roles);
    console.log('rolesAllowed', rolesAllowed);

    // Verificar si el usuario tiene **todos** los roles necesarios
    //return rolesAllowed.every((role) => user.roles.includes(role));
    return rolesAllowed.some((role) => user.roles?.includes(role));
  }
}

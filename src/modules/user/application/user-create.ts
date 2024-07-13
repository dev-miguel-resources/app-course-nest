import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { User } from '../domain/roots/user';
import { UserInfraestructure } from '../infraestructure/user.infraestructure';

@Injectable()
export class UserCreate {
  // design pattern: inyección de dependencias: dependencias visibles
  // PRINCIPIO SOLID: Inversión de dependencias
  constructor(
    @Inject(UserInfraestructure) private readonly repository: UserRepository,
  ) {}

  // defines tus casos de uso: deben estar implementados desde otras capas para darles vida
  async save(user: User) {
    const userInserted = await this.repository.save(user);
    return userInserted;
  }
}

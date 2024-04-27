import { UserRepository } from '../domain/repositories/user.repository';
import { User } from '../domain/roots/user';

export class UserCreate {
  repository: UserRepository;

  // design pattern: inyección de dependencias: dependencias visibles
  // PRINCIPIO SOLID: Inversión de dependencias
  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  // defines tus casos de uso: deben estar implementados desde otras capas para darles vida
  async save(user: User) {
    const userInserted = await this.repository.save(user);
    return userInserted;
  }
}

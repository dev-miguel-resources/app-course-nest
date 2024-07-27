import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { UserInfraestructure } from '../infraestructure/user.infraestructure';
import { UserResponseDTO } from './dtos/user.reponse.dto';

@Injectable()
export class UserList {
  constructor(
    @Inject(UserInfraestructure)
    private readonly repository: UserRepository,
  ) {}

  async getList() {
    const users = await this.repository.list();
    const response = UserResponseDTO.fromDomainToResponse(users);
    return response;
  }
}

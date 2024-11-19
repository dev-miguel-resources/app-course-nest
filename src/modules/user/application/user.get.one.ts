import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { UserInfraestructure } from '../infraestructure/user.infraestructure';
import { UserResponseDTO } from './dtos/user.response.dto';

@Injectable()
export class UserGetOne {
  constructor(
    @Inject(UserInfraestructure)
    private readonly repository: UserRepository,
  ) {}

  async getOne(id: string) {
    const userFound = await this.repository.findById(id);
    const response = UserResponseDTO.fromDomainToResponse(userFound);
    return response;
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDTO } from '../dtos/user.create.dto';
import { UserProperties } from 'src/modules/user/domain/roots/interfaces/user.interface';
import { UserFactory } from 'src/modules/user/domain/roots/user.factory';
import { UserCreate } from 'src/modules/user/application/user-create';

@Controller('users')
export class UserController {
  constructor(private readonly userCreate: UserCreate) {}

  @Post()
  async insert(@Body() body: UserCreateDTO) {
    const userProperties: UserProperties = body;

    // paso importante: validas el negocio
    const user = UserFactory.create(userProperties);

    // validas el proceso http
    await this.userCreate.save(user);

    return body;
  }
}

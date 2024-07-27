import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserCreateDTO } from '../dtos/user.create.dto';
import { UserProperties } from 'src/modules/user/domain/roots/interfaces/user.interface';
import { UserFactory } from 'src/modules/user/domain/roots/user.factory';
import { UserCreate } from 'src/modules/user/application/user.create';
import { UserGetOneDTO } from '../dtos/user.get.one.dto';
import { UserGetOne } from 'src/modules/user/application/user.get.one';
import { UserList } from '../../../application/user.list';

@Controller('users')
export class UserController {
  constructor(
    private readonly userCreate: UserCreate,
    private readonly userGetOne: UserGetOne,
    private readonly userList: UserList,
  ) {}

  @Post()
  async insert(@Body() body: UserCreateDTO) {
    const userProperties: UserProperties = body;

    // paso importante: validas el negocio
    const user = UserFactory.create(userProperties);

    // validas el proceso http
    await this.userCreate.save(user);

    return body;
  }

  @Get()
  async list() {
    const users = await this.userList.getList();
    return users;
  }

  @Get('/:id')
  async getOne(@Param() params: UserGetOneDTO) {
    const { id } = params;
    const user = await this.userGetOne.getOne(id);
    // pendiente
    return user;
  }
}

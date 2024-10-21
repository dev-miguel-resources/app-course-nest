import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserCreateDTO } from '../dtos/user.create.dto';
import { UserProperties } from 'src/modules/user/domain/roots/interfaces/user.interface';
import { UserFactory } from 'src/modules/user/domain/roots/user.factory';
import { UserCreate } from 'src/modules/user/application/user.create';
import { UserGetOneDTO } from '../dtos/user.get.one.dto';
import { UserGetOne } from 'src/modules/user/application/user.get.one';
import { UserList } from '../../../application/user.list';
import { ApiTags } from '@nestjs/swagger';
import { Crypt } from 'src/core/infraestructure/presentation/services/crypt.service';
import {
  RoleEnum,
  Roles,
} from 'src/core/infraestructure/presentation/decorators/roles';
import { AuthenticationGuard } from 'src/core/infraestructure/presentation/guards/authentication.guard';
import { AuthorizationGuard } from '../../../../../core/infraestructure/presentation/guards/authorization.guard';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly userCreate: UserCreate,
    private readonly userGetOne: UserGetOne,
    private readonly userList: UserList,
  ) {}

  @Post()
  async insert(@Body() body: UserCreateDTO) {
    const userProperties: UserProperties = {
      ...body,
      password: await Crypt.encript(body.password),
    };
    const user = UserFactory.create(userProperties);

    const userSaved = await this.userCreate.save(user);

    return userSaved;
  }

  @Get()
  @Roles(RoleEnum.STUDENT, RoleEnum.TEACHER)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  async list() {
    const users = await this.userList.getList();
    return users;
  }

  @Get('/:id')
  async getOne(@Param() params: UserGetOneDTO) {
    const { id } = params;
    const user = await this.userGetOne.getOne(id);
    return user;
  }
}

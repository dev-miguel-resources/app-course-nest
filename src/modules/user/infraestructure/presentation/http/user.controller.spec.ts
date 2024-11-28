import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';

import { DatabaseModule } from '../../../../../core/infraestructure/database/database.module';
import { UserCreate } from '../../../application/user.create';
import { UserGetOne } from '../../../application/user.get.one';
import { UserList } from '../../../application/user.list';
import { User } from '../../../domain/roots/user';
import { userProviders } from '../../providers/user.provider';
import { UserInfraestructure } from '../../user.infraestructure';
import { UserResponse } from '../../../application/dtos/user.response.dto';
import { UserController } from './user.controller';
import { UserCreateDTO } from '../dtos/user.create.dto';

let mod: any;
let userCreate: UserCreate;
let userController: UserController;
let userList: UserList;

describe('User Controller', () => {
  beforeEach(async () => {
    // antes de cada prueba prepara la suite
    // esto es para crear la suite de mock con los datos
    mod = await Test.createTestingModule({
      imports: [DatabaseModule, ConfigModule.forRoot()], // la referencia del módulo con las variables de entorno
      controllers: [UserController],
      providers: [
        ...userProviders,
        UserCreate,
        UserList,
        UserGetOne,
        UserInfraestructure,
      ],
    }).compile(); // deja preparada la data para compilar el test

    userCreate = mod.get(UserCreate); // mockea las implementaciones
    userController = mod.get(UserController);
    userList = mod.get(UserList);
  });

  // INTEGRATION TEST
  it(
    'should create a new user',
    async () => {
      // Arrange or Given
      const request = {
        id: 'ef310faa-7bed-480f-9cdc-36995e907dcc',
        fullname: 'Miguel Chamorro',
        email: 'michamor@email.com',
        image: 'foto.jpg',
        password: 'Mundo12345',
        roles: [
          { id: '287e84a5-698d-4f6c-b5bf-4d2c0e4daa52', name: 'ADMIN' },
          { id: 'cfd51374-d308-46ed-b656-d2257337c69a', name: 'TEACHER' },
        ],
        address: {
          street: 'Rua 1',
          number: 123,
          city: 'Chile',
          country: 'Chillan',
        },
      };

      const user = new User(request);

      jest
        .spyOn(userCreate, 'save')
        .mockImplementation(() => Promise.resolve(user));

      // Act / When
      const userInserted = await userController.insert(request); // endpoint

      // Assert / Then
      //expect(userInserted).toEqual(request);
      expect(userInserted).toMatchObject(request);
    },
    //24 * 60 * 60 * 1000,
    5 * 60 * 1000, // Resultado: 300000 = 5 min.
  );

  // TEST UNITARIO
  it(
    'should throw an error if user ID is not a string',
    async () => {
      // Arrange
      const request = {
        id: 12345, // El ID es un número, no un string
        fullname: 'Miguel Chamorro',
        email: 'michamor@email.com',
        image: 'foto.jpg',
        password: 'Mundo12345',
        roles: [
          { id: '287e84a5-698d-4f6c-b5bf-4d2c0e4daa52', name: 'ADMIN' },
          { id: 'cfd51374-d308-46ed-b656-d2257337c69a', name: 'TEACHER' },
        ],
        address: {
          street: 'Rua 1',
          number: 123,
          city: 'Chile',
          country: 'Chillan',
        },
      } as unknown as UserCreateDTO;

      jest.spyOn(userCreate, 'save').mockImplementation(() => {
        throw new Error('Invalid id'); // Simula el error esperado
      });

      // Act & Assert
      await expect(userController.insert(request)).rejects.toThrow(
        'Invalid id', // Verifica que el error lanzado sea el esperado
      );
    },
    5 * 60 * 1000,
  );

  it('List of users', async () => {
    // Arrange
    const users = [
      {
        id: 'ef310faa-7bed-480f-9cdc-36995e907dcc',
        fullname: 'user01',
        email: 'user01@email.com',
        image: 'foto.jpg',
        roles: [
          { id: '287e84a5-698d-4f6c-b5bf-4d2c0e4daa52' },
          { id: 'cfd51374-d308-46ed-b656-d2257337c69a' },
        ],
        address: {
          street: 'Rua 1',
          number: 123,
          city: 'Bogotá',
          country: 'Colombia',
        },
        password: 'Mundo12345',
      },
      {
        id: 'cfd51374-d308-46ed-b656-d2257337c69a',
        fullname: 'user02',
        email: 'user02@email.com',
        image: 'foto.jpg',
        roles: [
          { id: '287e84a5-698d-4f6c-b5bf-4d2c0e4daa52' },
          { id: 'cfd51374-d308-46ed-b656-d2257337c69a' },
        ],
        address: {
          street: 'Rua 1',
          number: 123,
          city: 'Perú',
          country: 'Lima',
        },
        password: 'Mundo12345',
      },
      {
        id: '287e84a5-698d-4f6c-b5bf-4d2c0e4daa52',
        fullname: 'user03',
        email: 'user03@email.com',
        image: 'foto.jpg',
        roles: [
          { id: '287e84a5-698d-4f6c-b5bf-4d2c0e4daa52' },
          { id: 'cfd51374-d308-46ed-b656-d2257337c69a' },
        ],
        address: {
          street: 'Rua 1',
          number: 123,
          city: 'Nicaragua',
          country: 'Managua',
        },
        password: 'Mundo12345',
      },
    ];

    const usersInstance = users.map((user) => {
      const userResponse = new UserResponse();
      userResponse.id = user.id;
      userResponse.fullname = user.fullname;
      userResponse.email = user.email;
      userResponse.image = user.image;
      userResponse.roles = user.roles;
      userResponse.address = user.address;
      userResponse.password = user.password;

      return userResponse;
    });

    jest
      .spyOn(userList, 'getList')
      .mockImplementation(() => Promise.resolve(usersInstance));

    // Act
    const usersFound = (await userController.list()) as UserResponse[];

    // Assert
    expect(usersFound).toEqual(usersInstance);
    expect(usersFound.length).toEqual(3);
    expect(usersFound[0].id).toEqual(usersInstance[0].id);
    expect(usersFound[1]).toHaveProperty('image');
  });
});

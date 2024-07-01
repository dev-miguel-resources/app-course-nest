import { UserEntity } from '../user.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource) => dataSource.getRepository(UserEntity), // querys pre-fabricadas
    inject: ['DATA_SOURCE_MYSQL'],
  },
  {
    provide: 'USER_MANAGER',
    useFactory: (dataSource) => dataSource.manager, // createQuery -> querys nativas
    inject: ['DATA_SOURCE_MYSQL'],
  },
];

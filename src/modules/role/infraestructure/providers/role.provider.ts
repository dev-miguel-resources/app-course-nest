import { RoleEntity } from '../entities/role.entity';

export const roleProviders = [
  {
    provide: 'ROLE_REPOSITORY',
    useFactory: (dataSource) => dataSource.getRepository(RoleEntity), // querys pre-fabricadas
    inject: ['DATA_SOURCE_MYSQL'],
  },
  {
    provide: 'USER_MANAGER',
    useFactory: (dataSource) => dataSource.manager, // createQuery -> querys nativas
    inject: ['DATA_SOURCE_MYSQL'],
  },
];

import { UserEntity } from 'src/modules/user/infraestructure/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE_MYSQL',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3310,
        username: 'mchamorro',
        password: '12345',
        database: 'db',
        entities: [UserEntity],
        synchronize: true, // dev
        logging: true, // dev
      });

      return dataSource.initialize(); // devulve la instancia de la bdd a partir del token
    },
  },
];

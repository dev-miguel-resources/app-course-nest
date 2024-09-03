import { UserEntity } from '../../../modules/user/infraestructure/user.entity';
import { RoleEntity } from '../../../modules/role/infraestructure/entities/role.entity';
import { DataSource } from 'typeorm';
import { CourseEntity } from 'src/modules/course/infraestructure/entities/course.entity';
import { ScheduleEntity } from 'src/modules/schedule/infraestructure/entities/schedule.entity';

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
        entities: [UserEntity, RoleEntity, CourseEntity, ScheduleEntity],
        synchronize: true, // dev
        logging: true, // dev
      });

      return dataSource.initialize(); // devulve la instancia de la bdd a partir del token
    },
  },
  {
    provide: 'DATA_SOURCE_MONGO',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mongodb',
        host: 'localhost',
        //url: 'mongodb://root:12345@localhost/db?authSource=admin'
        port: 27017,
        username: 'root',
        password: '12345',
        database: 'db',
        authSource: 'admin',
        entities: [],
        synchronize: true, // dev
        logging: true, // dev
      });

      return dataSource.initialize(); // devuelve la instancia del mongo server
    },
  },
];

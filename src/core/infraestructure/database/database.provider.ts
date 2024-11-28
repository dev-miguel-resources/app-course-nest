import { UserEntity } from '../../../modules/user/infraestructure/user.entity';
import { RoleEntity } from '../../../modules/role/infraestructure/entities/role.entity';
import { DataSource } from 'typeorm';
import { CourseEntity } from '../../../modules/course/infraestructure/entities/course.entity';
import { ScheduleEntity } from '../../../modules/schedule/infraestructure/entities/schedule.entity';
import { AppService } from '../../../app.service';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE_MYSQL',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: AppService.db_host,
        port: AppService.db_port,
        username: AppService.db_username,
        password: AppService.db_password,
        database: AppService.db_database,
        entities: [UserEntity, RoleEntity, CourseEntity, ScheduleEntity],
        synchronize: true,
        logging: false,
      });

      return dataSource.initialize();
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

import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
//import { DataSource } from 'typeorm';
//import { Database } from './database.provider';

@Module({
  providers: [
    ...databaseProviders,
    /*{
      provide: 'DATA_SOURCE_MYSQL',
      useFactory: async () => {
        const dataSource = new DataSource({
          type: 'mysql',
          host: 'localhost',
          port: 3310,
          username: 'mchamorro',
          password: '12345',
          database: 'db',
          entities: [],
          synchronize: true, // dev
          logging: true, // dev
        });

        return dataSource.initialize();
      },
    },*/
  ],
  exports: [...databaseProviders],
})
export class DatabaseModule {}

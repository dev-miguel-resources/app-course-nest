import { Module } from '@nestjs/common';

import { EnrollService } from './enroll.service';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports: [],
  controllers: [StudentController],
  providers: [
    /*{
      provide: StudentService, // esto es cuando quiero utilizar un identificador
      useClass: StudentService, // las instancias se llaman una vez
    },*/
    StudentService,
    {
      provide: 'STUDENT',
      useClass: StudentService,
    },
    {
      provide: 'CONFIG',
      useValue: {
        url: 'http://localhost:3000',
      },
    },
    {
      provide: 'CONFIG2',
      useFactory: () => {
        return {
          url: 'http://localhost:4000',
        };
      },
    },
    {
      provide: 'ENVIRONMENT',
      useValue: process.env.NODE_ENV,
    },
    {
      provide: 'CONFIG3',
      useFactory: (env, config) => {
        return {
          url:
            env === 'development'
              ? 'http://localhost:3000'
              : 'http://localhost:4000',
          urlConfig: config.url,
        };
      },
      inject: ['ENVIRONMENT', 'CONFIG2'],
    },
    {
      provide: 'CONFIG4',
      useValue: {
        serverOAuth2: 'https://localhost:5000',
      },
    },
    EnrollService,
  ],
})
export class StudentModule {}

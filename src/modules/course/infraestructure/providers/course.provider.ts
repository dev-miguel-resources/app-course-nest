import { CourseEntity } from '../entities/course.entity';

export const courseProviders = [
  {
    provide: 'COURSE_REPOSITORY',
    useFactory: (dataSource) => dataSource.getRepository(CourseEntity),
    inject: ['DATA_SOURCE_MYSQL'],
  },
];

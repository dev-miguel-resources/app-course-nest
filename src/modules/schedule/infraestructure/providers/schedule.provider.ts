import { ScheduleEntity } from '../entities/schedule.entity';

export const scheduleProviders = [
  {
    provide: 'SCHEDULE_REPOSITORY',
    useFactory: (dataSource) => dataSource.getRepository(ScheduleEntity),
    inject: ['DATA_SOURCE_MYSQL'],
  },
];

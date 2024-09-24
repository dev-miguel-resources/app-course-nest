import { plainToInstance } from 'class-transformer';
import { PaginateResult } from 'src/core/domain/interfaces/paginate.interface';

import { CourseEntity } from 'src/modules/course/infraestructure/entities/course.entity';
import {
  FREQUENCY,
  Schedule,
  ScheduleProps,
  STATUS_SCHEDULE,
  TYPE_COURSE,
} from '../../domain/roots/schedule';
import { ScheduleEntity } from '../entities/schedule.entity';

export class ScheduleDto {
  static fromDomainToData(schedule: Schedule): ScheduleEntity {
    const courseEntity = new CourseEntity();
    courseEntity.id = schedule.properties.courseId;

    const data = { ...schedule.properties, course: courseEntity };

    const scheduleEntity = plainToInstance(ScheduleEntity, data);

    return scheduleEntity;
  }

  static fromDataToDomain(
    scheduleEntity: ScheduleEntity | ScheduleEntity[],
  ): Schedule | Schedule[] {
    if (Array.isArray(scheduleEntity))
      return scheduleEntity.map(
        (schedule) => this.fromDataToDomain(schedule) as Schedule,
      );

    const props: ScheduleProps = {
      id: scheduleEntity.id,
      title: scheduleEntity.title,
      type: TYPE_COURSE[scheduleEntity.type],
      summary: scheduleEntity.summary,
      slogan: scheduleEntity.slogan,
      prices: scheduleEntity.prices,
      dateStart: scheduleEntity.dateStart,
      hourStart: scheduleEntity.hourStart,
      hourEnd: scheduleEntity.hourEnd,
      duration: scheduleEntity.duration,
      frequency: FREQUENCY[scheduleEntity.frequency],
      status: STATUS_SCHEDULE[scheduleEntity.status],
      whatLearn: scheduleEntity.whatLearn,
      requirements: scheduleEntity.requirements,
      content: scheduleEntity.content,
      createdAt: scheduleEntity.createdAt,
      updatedAt: scheduleEntity.updatedAt,
      deletedAt: scheduleEntity.deletedAt,
      courseId: scheduleEntity.course.id,
      // pendiente
    };
    const schedule = new Schedule(props);

    return schedule;
  }

  static fromDataToDomainPaginate(
    schedules: ScheduleEntity[],
    total: number,
  ): PaginateResult<Schedule> {
    return {
      total,
      data: this.fromDataToDomain(schedules) as Schedule[],
    };
  }
}

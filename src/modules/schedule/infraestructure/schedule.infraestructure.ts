import { PaginateResult } from 'src/core/domain/interfaces/paginate.interface';
import { ScheduleRepository } from '../domain/repositories/schedule.repository';
import { Schedule } from '../domain/roots/schedule';
import { IsNull, Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { ScheduleEntity } from './entities/schedule.entity';
import { ScheduleDto } from './dtos/schedule.dto';

export class ScheduleInfraestructure implements ScheduleRepository {
  constructor(
    @Inject('SCHEDULE_REPOSITORY')
    private readonly repository: Repository<ScheduleEntity>,
  ) {}

  async save(schedule: Schedule): Promise<Schedule> {
    const userEntity = ScheduleDto.fromDomainToData(schedule);

    await this.repository.save(userEntity);

    return schedule;
  }
  async findById(id: string): Promise<Schedule | undefined> {
    const scheduleEntity = await this.repository.findOne({
      where: { id, deletedAt: IsNull() },
    });

    if (!scheduleEntity) return null;

    return ScheduleDto.fromDataToDomain(scheduleEntity) as Schedule;
  }
  async findAll(): Promise<Schedule[]> {
    const listScheduleEntity = await this.repository.find({
      where: { deletedAt: IsNull() },
    });

    if (!listScheduleEntity) return null;

    return ScheduleDto.fromDataToDomain(listScheduleEntity) as Schedule[];
  }

  async findByPage(
    page: number,
    pageSize: number,
  ): Promise<PaginateResult<Schedule>> {
    const [records, total] = await this.repository.findAndCount({
      // page: 1 * 3 = 3, page2: 2 * 3 = 6
      skip: page * pageSize,
      // tamaño de la página
      take: pageSize,
      // condición de extracción
      where: { deletedAt: IsNull() },
    });

    if (!records) return null;

    return ScheduleDto.fromDataToDomainPaginate(records, total);
  }
}

import { Schedule } from '../roots/schedule';
import { PaginateResult } from '../../../../../dist/core/domain/interfaces/paginate.interface';

export interface ScheduleRepository {
  save(schedule: Schedule): Promise<Schedule>;
  findById(id: string): Promise<Schedule | undefined>;
  findAll(): Promise<Schedule[]>;
  findByPage(page: number, pageSize: number): Promise<PaginateResult<Schedule>>;
}

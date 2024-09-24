import { Body, Controller, Post } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { ScheduleApplication } from 'src/modules/schedule/application/schedule.application';
import { ScheduleCreateDto } from '../dtos/schedule-create.dto';
import { Schedule, ScheduleProps } from '../../../domain/roots/schedule';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Schedule')
@Controller('schedules')
export class ScheduleController {
  constructor(private readonly application: ScheduleApplication) {}

  @Post()
  async insert(@Body() body: ScheduleCreateDto) {
    const props = {
      id: uuidv4(),
      ...body,
    };
    const schedule = new Schedule(props as ScheduleProps);
    const scheduleCreated = await this.application.save(schedule);

    return scheduleCreated;
  }
}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from 'src/core/infraestructure/database/database.module';
import { ScheduleApplication } from '../../application/schedule.application';
import { ScheduleInfraestructure } from '../schedule.infraestructure';
import { scheduleProviders } from '../providers/schedule.provider';
import { ScheduleController } from './http/schedule.controller';

const infraestructure = [ScheduleInfraestructure];
const application = [ScheduleApplication]; // falta registrar otra cosa de application
const othersProviders = [...scheduleProviders];

@Module({
  imports: [DatabaseModule, CqrsModule],
  controllers: [ScheduleController],
  providers: [...infraestructure, ...application, ...othersProviders],
})
export class ScheduleModule {}

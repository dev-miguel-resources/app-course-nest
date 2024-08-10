import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AppointmentCLCommandHandler } from '../../application/commands/appointment.cl.command';
import { AppointmentCOCommandHandler } from '../../application/commands/appointment.co.command';
import { AppointmentMXCommandHandler } from '../../application/commands/appointment.mx.command';
import { AppointmentController } from './appoinment.controller';

const application = [
  AppointmentCLCommandHandler,
  AppointmentCOCommandHandler,
  AppointmentMXCommandHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [AppointmentController],
  providers: [...application],
})
export class AppoinmentModule {}

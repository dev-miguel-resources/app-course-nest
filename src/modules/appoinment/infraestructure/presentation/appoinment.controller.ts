import { Body, Controller, Post } from '@nestjs/common';

import { AppoinmentCLCommand } from '../../application/commands/appointment.cl.command';
import { AppoinmentCOCommand } from '../../application/commands/appointment.co.command';
import { AppoinmentMXCommand } from '../../application/commands/appointment.mx.command';
import { CommandBus } from '@nestjs/cqrs';
import { AppoinmentCreateDTO } from './dtos/appoinment.create.dto';
import { ApiTags } from '@nestjs/swagger';

const countryCommands = {
  CL: AppoinmentCLCommand,
  CO: AppoinmentCOCommand,
  MX: AppoinmentMXCommand,
};

@ApiTags('Appointment')
@Controller('appointments')
export class AppointmentController {
  // recibes una dy
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createAppointment(@Body() appointment: AppoinmentCreateDTO) {
    // recibir el código del país para saber a que lógica (handler) debe derivarlo
    const appointmentCommand = new countryCommands[appointment.countryIso]();
    // armamos un objeto con el código del país y los datos
    Object.assign(appointmentCommand, appointment);

    // el command bus una vez tiene preparado los datos deriva la ejecución del comando al handler respectivo de acuerdo al código recibido
    const idReturned = await this.commandBus.execute(appointmentCommand);

    return { idReturned };
  }
}

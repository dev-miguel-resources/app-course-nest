import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Appoinment } from '../../domain/appoinment';

// Paso 1: Definir la estructura del comando: preparo los dato
export class AppoinmentMXCommand implements ICommand {
  patientId: string;
  doctorId: string;
  specialtyId: string;
  centerId: number;
  date: Date;
}

// Manejador del comando
@CommandHandler(AppoinmentMXCommand)
export class AppointmentMXCommandHandler
  implements ICommandHandler<AppoinmentMXCommand>
{
  execute(command: AppoinmentMXCommand): Promise<any> {
    console.log('AppoinmentMXCommandHandler', command);

    const { patientId, doctorId, specialtyId, centerId, date } = command;

    const appointment = new Appoinment(
      patientId,
      doctorId,
      specialtyId,
      date,
      centerId,
      'CL',
    );

    // nos devuelva el appoinment x su id
    return Promise.resolve(appointment.properties.id);
  }
}

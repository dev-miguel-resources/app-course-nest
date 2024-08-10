import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Appoinment } from '../../domain/appoinment';

// Paso 1: Definir la estructura del comando: preparo los dato
export class AppoinmentCLCommand implements ICommand {
  patientId: string;
  doctorId: string;
  specialtyId: string;
  centerId: number;
  date: Date;
}

// Manejador del comando
@CommandHandler(AppoinmentCLCommand)
export class AppointmentCLCommandHandler
  implements ICommandHandler<AppoinmentCLCommand>
{
  execute(command: AppoinmentCLCommand): Promise<any> {
    console.log('AppoinmentCLCommandHandler', command);

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

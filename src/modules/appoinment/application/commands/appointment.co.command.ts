import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Appoinment } from '../../domain/appoinment';

// Paso 1: Definir la estructura del comando: preparo los dato
export class AppoinmentCOCommand implements ICommand {
  patientId: string;
  doctorId: string;
  specialtyId: string;
  centerId: number;
  date: Date;
}

// Manejador del comando
@CommandHandler(AppoinmentCOCommand)
export class AppointmentCOCommandHandler
  implements ICommandHandler<AppoinmentCOCommand>
{
  execute(command: AppoinmentCOCommand): Promise<any> {
    console.log('AppoinmentCOCommandHandler', command);

    const { patientId, doctorId, specialtyId, centerId, date } = command;

    const appointment = new Appoinment(
      patientId,
      doctorId,
      specialtyId,
      date,
      centerId,
      'CO',
    );

    // nos devuelva el appoinment x su id
    return Promise.resolve(appointment.properties.id);
  }
}

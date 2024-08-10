import { v4 as uuidv4, validate } from 'uuid';

export class Appoinment {
  private readonly id: string;
  private patientId: string;
  private doctorId: string;
  private specialityId: string;
  private date: Date;
  private centerId: number;
  private countryIso: 'CL' | 'CO' | 'MX';

  constructor(
    patientId: string,
    doctorId: string,
    specialityId: string,
    date: Date,
    centerId: number,
    countryIso: 'CL' | 'CO' | 'MX',
  ) {
    if (!validate(patientId)) {
      throw new Error('Invalid patient ID');
    }
    if (!validate(doctorId)) {
      throw new Error('Invalid doctor ID');
    }
    if (!validate(specialityId)) {
      throw new Error('Invalid speciality ID');
    }
    if (!Number.isInteger(centerId)) {
      throw new Error('Invalid center ID');
    }
    if (Number(centerId) <= 0) {
      throw new Error('Invalid center ID');
    }
    if (!date) {
      throw new Error('Invalid date');
    }

    Object.assign(this, {
      patientId,
      doctorId,
      specialityId,
      date,
      centerId,
      countryIso,
    });

    this.id = uuidv4();
  }

  // getter: no reciben parametros, debe retornar un valor, se invoca como un atributo sin ()
  // cuando haces lectura de una estructura simple
  get properties() {
    return {
      id: this.id,
      patientId: this.patientId,
      doctorId: this.doctorId,
      specialtyId: this.specialityId,
      date: this.date,
      centerId: this.centerId,
      countryIso: this.countryIso,
    };
  }
}

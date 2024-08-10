import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class AppoinmentCreateDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  patientId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  doctorId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  specialtyId: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  centerId: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['CL', 'CO', 'MX'])
  countryIso: string;
}

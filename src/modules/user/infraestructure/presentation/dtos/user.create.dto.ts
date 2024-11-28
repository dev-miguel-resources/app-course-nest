import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { Role } from './role.user.create';
import { Address } from './address.user.create';

export class UserCreateDTO {
  @IsNotEmpty({ message: 'ID is not be empty' })
  @IsString({ message: 'ID must be a string' })
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  fullname: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  /* Debe tener al menos una letra minúscula.
    Debe tener al menos una letra mayúscula.
    Debe tener al menos un dígito.
    Debe tener una longitud mínima de 8 caracteres.
    Solo puede contener letras (mayúsculas y minúsculas) y dígitos.
    Ejemplos
    Válido: Password1, Aa1bcdef, 1234Abcd
    No válido: password (no hay mayúsculas ni dígitos), PASSWORD1 (no hay minúsculas), Pass1 (menos de 8 caracteres).*/

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  password: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => Role)
  roles: Role[];

  @IsOptional()
  @ValidateNested()
  @Type(() => Address)
  address: Address;
}

import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class Address {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  street: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  number: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  city: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  country: string;
}

export class Role {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;
}

export class UserUpdateDTO {
  @IsOptional()
  @IsString()
  @MinLength(3)
  fullname: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  password: string;

  @IsOptional()
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

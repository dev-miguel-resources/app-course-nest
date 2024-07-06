import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
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

import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

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

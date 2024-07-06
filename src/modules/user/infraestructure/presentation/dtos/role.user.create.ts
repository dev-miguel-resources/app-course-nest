import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class Role {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}

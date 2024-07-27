import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

// dto para la capa de presentación http
export class UserGetOneDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}

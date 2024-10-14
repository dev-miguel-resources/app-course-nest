import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CourseIdDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}

import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CourseCreateDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;
}

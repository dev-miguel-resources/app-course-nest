import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CourseSlugDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  slug: string;
}

import { plainToInstance } from 'class-transformer';
import { Course } from '../../domain/roots/course';
import { ApiProperty } from '@nestjs/swagger';

export class CourseResponse {
  @ApiProperty({
    type: 'string',
    example: '15ba68b0-4609-4c5b-b33f-3b342499f5c2',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    example: 'Curso de Docker',
  })
  title: string;
  @ApiProperty({
    type: 'string',
    example: 'course-docker',
  })
  slug: string;
  @ApiProperty({
    type: 'date',
    example: '2024-09-09T18:15:15.000Z',
  })
  createdAt: Date;
}

export class CourseDto {
  static fromDomainToInstance(course: Course): CourseResponse {
    return plainToInstance(CourseResponse, course.properties);
  }
}

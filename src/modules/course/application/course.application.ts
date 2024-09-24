import { Inject, Injectable } from '@nestjs/common';
import { CourseRepository } from '../domain/repositories/course.repository';
import { CourseInfraestructure } from '../infraestructure/course.infraestructure';
import { Course } from '../domain/roots/course';

@Injectable()
export class CourseApplication {
  constructor(
    @Inject(CourseInfraestructure)
    private readonly repository: CourseRepository,
  ) {}

  async save(course: Course): Promise<Course> {
    return await this.repository.save(course);
  }
}

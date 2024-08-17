import { Inject, Injectable } from '@nestjs/common';
import { CourseRepository } from '../domain/repositories/course.repository';
import { CourseInfraestructure } from '../infraestructure/course.infraestructure';
import { Course } from '../domain/roots/course';
import { PaginateResult } from 'src/core/domain/interfaces/paginate.interface';

@Injectable()
export class CourseApplication {
  constructor(
    @Inject(CourseInfraestructure)
    private readonly repository: CourseRepository,
  ) {}

  async save(course: Course): Promise<Course> {
    return await this.repository.save(course);
  }

  async findById(id: string): Promise<Course> {
    return await this.repository.findById(id);
  }

  async findBySlug(slug: string): Promise<Course> {
    return await this.repository.findBySlug(slug);
  }

  async findByPage(
    page: number,
    pageSize: number,
  ): Promise<PaginateResult<Course>> {
    return await this.repository.findByPage(page, pageSize);
  }
}

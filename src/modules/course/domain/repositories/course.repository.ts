import { PaginateResult } from 'src/core/domain/interfaces/paginate.interface';
import { Course } from '../roots/course';

export interface CourseRepository {
  save(course: Course): Promise<Course>;
  findById(id: string): Promise<Course | undefined>;
  findBySlug(slug: string): Promise<Course | undefined>;
  findAll(): Promise<Course[]>;
  findByPage(page: number, pageSize: number): Promise<PaginateResult<Course>>;
}

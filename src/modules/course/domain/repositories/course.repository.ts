import { Course } from '../roots/course';

export interface CourseRepository {
  save(course: Course): Promise<Course>;
}

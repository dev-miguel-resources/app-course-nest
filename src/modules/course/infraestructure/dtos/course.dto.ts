import { plainToInstance } from 'class-transformer';
import { CourseEntity } from '../entities/course.entity';
import { Course, CourseProps } from '../../domain/roots/course';
import { PaginateResult } from 'src/core/domain/interfaces/paginate.interface';

export class CourseDTO {
  static fromDomainToData(course: Course): CourseEntity {
    const courseEntity = plainToInstance(CourseEntity, course.properties);
    return courseEntity;
  }

  static fromDataToDomain(
    courseEntity: CourseEntity | CourseEntity[],
  ): Course | Course[] {
    if (Array.isArray(courseEntity))
      return courseEntity.map(
        (course) => this.fromDataToDomain(course) as Course,
      );

    const props: CourseProps = {
      id: courseEntity.id,
      title: courseEntity.title,
      slug: courseEntity.slug,
      createdAt: courseEntity.createdAt,
      updatedAt: courseEntity.updatedAt,
      isDeleted: courseEntity.isDeleted,
    };

    const course = new Course(props);

    return course;
  }

  static fromDataToDomainPaginate(
    courses: CourseEntity[],
    total: number,
  ): PaginateResult<Course> {
    return {
      total,
      data: this.fromDataToDomain(courses) as Course[],
    };
  }
}

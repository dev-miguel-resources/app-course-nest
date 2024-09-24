import { plainToInstance } from 'class-transformer';
import { PaginateResult } from 'src/core/domain/interfaces/paginate.interface';

import { Course, CourseProps } from '../../domain/roots/course';
import { CourseEntity } from '../entities/course.entity';

export class CourseDto {
  static fromDomainToData(course: Course): CourseEntity {
    const courseEntity = plainToInstance(CourseEntity, course.properties);
    // const courseEntity = new CourseEntity();
    // courseEntity.id = course.properties.id;
    // courseEntity.title = course.properties.title;
    // courseEntity.slug = course.properties.slug;
    // courseEntity.createdAt = course.properties.createdAt;
    // courseEntity.updatedAt = course.properties.updatedAt;
    // courseEntity.isDeleted = course.properties.isDeleted;

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

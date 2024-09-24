import { CourseRepository } from '../domain/repositories/course.repository';
import { Course } from '../domain/roots/course';
import { Repository } from 'typeorm';
import { CourseEntity } from './entities/course.entity';
import { Inject } from '@nestjs/common';
import { CourseDto } from './dtos/course.dto';

//@Injectable()
export class CourseInfraestructure implements CourseRepository {
  constructor(
    @Inject('COURSE_REPOSITORY')
    private readonly repository: Repository<CourseEntity>,
  ) {}

  async save(course: Course): Promise<Course> {
    const userEntity = CourseDto.fromDomainToData(course);
    await this.repository.save(userEntity);
    return course;
  }
}

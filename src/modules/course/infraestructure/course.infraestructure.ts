import { PaginateResult } from 'src/core/domain/interfaces/paginate.interface';
import { CourseRepository } from '../domain/repositories/course.repository';
import { Course } from '../domain/roots/course';
import { Repository } from 'typeorm';
import { CourseEntity } from './entities/course.entity';
import { Inject } from '@nestjs/common';
import { CourseDTO } from './dtos/course.dto';

//@Injectable()
export class CourseInfraestructure implements CourseRepository {
  constructor(
    @Inject('COURSE_REPOSITORY')
    private readonly repository: Repository<CourseEntity>,
  ) {}

  async save(course: Course): Promise<Course> {
    const userEntity = CourseDTO.fromDomainToData(course);
    await this.repository.save(userEntity);
    return course;
  }

  async findById(id: string): Promise<Course | undefined> {
    const courseEntity = await this.repository.findOne({
      where: { id, isDeleted: false },
    });

    if (!courseEntity) return null;

    return CourseDTO.fromDataToDomain(courseEntity) as Course;
  }

  async findBySlug(slug: string): Promise<Course | undefined> {
    const courseEntity = await this.repository.findOne({
      where: { slug, isDeleted: false },
    });

    if (!courseEntity) return null;

    return CourseDTO.fromDataToDomain(courseEntity) as Course;
  }

  async findAll(): Promise<Course[]> {
    const listCourseEntity = await this.repository.find({
      where: { isDeleted: false },
    });

    if (!listCourseEntity) return null;

    return CourseDTO.fromDataToDomain(listCourseEntity) as Course[];
  }

  async findByPage(
    page: number,
    pageSize: number,
  ): Promise<PaginateResult<Course>> {
    const [records, total] = await this.repository.findAndCount({
      // page: 1 * 3 = 3, page2: 2 * 3 = 6
      skip: page * pageSize,
      // tamaño de la página
      take: pageSize,
      // condición de extracción
      where: { isDeleted: false },
    });

    if (!records) return null;

    return CourseDTO.fromDataToDomainPaginate(records, total);
  }
}

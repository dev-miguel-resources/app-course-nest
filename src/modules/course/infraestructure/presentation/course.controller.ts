import { v4 as uuidv4 } from 'uuid';
import { Body, Controller, Post, Version } from '@nestjs/common';
import { CourseApplication } from '../../application/course.application';
import { CourseCreateDTO } from './dtos/course-create.dto';
import { CourseService } from '../../application/services/course.service';
import { Course, CourseProps } from '../../domain/roots/course';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Course')
@Controller('courses')
export class CourseController {
  constructor(
    private readonly application: CourseApplication,
    private readonly courseService: CourseService,
  ) {}

  @Post()
  async insert(@Body() body: CourseCreateDTO) {
    /*const slug = await this.courseService.generateSlug(body.title);

    const props: CourseProps = {
      id: uuidv4(),
      title: body.title,
      slug,
    };
    const course = new Course(props);

    return await this.application.save(course);*/
  }
}

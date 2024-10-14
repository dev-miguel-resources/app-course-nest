import { v4 as uuidv4 } from 'uuid';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Version,
} from '@nestjs/common';
import { CourseApplication } from '../../application/course.application';
import { CourseCreateDTO } from './dtos/course-create.dto';
import { CourseService } from '../../application/services/course.service';
import { Course, CourseProps } from '../../domain/roots/course';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CourseIdDto } from './dtos/course-id.dto';
import { CourseSlugDto } from './dtos/course-slug.dto';
import { CourseByPageDto } from './dtos/course-by-page.dto';
import { CourseResponse } from '../../application/dtos/course.dto.application';

@ApiTags('Course')
@Controller('courses')
export class CourseController {
  constructor(
    private readonly application: CourseApplication,
    private readonly courseService: CourseService,
  ) {}

  @Post()
  @Version('2')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CourseResponse,
  })
  @ApiOperation({ summary: 'Create a course' })
  async insert(@Body() body: CourseCreateDTO) {
    const slug = await this.courseService.generateSlug(body.title);

    const props: CourseProps = {
      id: uuidv4(),
      title: body.title,
      slug,
    };
    const course = new Course(props);

    return await this.application.save(course);
  }

  @Put(':id')
  async update(@Body() body: CourseCreateDTO, @Param() param: CourseIdDto) {
    const course = await this.application.findById(param.id);
    course.update(body);

    return await this.application.save(course);
  }

  @Get()
  async findAll() {
    return await this.application.findAll();
  }

  @Get(':id')
  async findById(@Param() param: CourseIdDto) {
    return await this.application.findById(param.id);
  }

  @Get(':slug')
  async findBySlug(@Param() param: CourseSlugDto) {
    return await this.application.findById(param.slug);
  }

  @Get(':page/:pageSize')
  async findByPage(@Param() param: CourseByPageDto) {
    return await this.application.findByPage(param.page, param.pageSize);
  }

  @Delete(':id')
  async delete(@Param() param: CourseIdDto) {
    const course = await this.application.findById(param.id);
    course.delete();

    return await this.application.save(course);
  }
}

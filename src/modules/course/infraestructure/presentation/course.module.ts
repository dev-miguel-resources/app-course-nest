import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/infraestructure/database/database.module';
import { CourseInfraestructure } from '../course.infraestructure';
import { CourseApplication } from '../../application/course.application';
import { courseProviders } from '../providers/course.provider';
import { CourseService } from '../../application/services/course.service';
import { CourseController } from './course.controller';

const infraestructure = [CourseInfraestructure];
const application = [CourseApplication];
const othersProviders = [...courseProviders, CourseService];

@Module({
  imports: [DatabaseModule],
  controllers: [CourseController],
  providers: [...infraestructure, ...application, ...othersProviders],
})
export class CourseModule {}

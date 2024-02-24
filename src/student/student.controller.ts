import { Controller, Get, Inject } from '@nestjs/common';

import { StudentService } from './student.service';

@Controller('students') // app.use("/students", StudentController), así sería en express
export class StudentController {
  constructor(
    @Inject('STUDENT') private readonly studentService: StudentService,
    @Inject('CONFIG') private readonly config: { url: string },
    @Inject('CONFIG2') private readonly config2: { url: string },
    @Inject('CONFIG3')
    private readonly config3: { url: string; urlConfig: string },
  ) {}

  @Get('/')
  async getAll() {
    const students = await this.studentService.getAll();

    // esto devuelve lo del enroll + studentService
    return [
      ...students,
      this.config.url,
      this.config2.url,
      this.config3.url,
      this.config3.urlConfig,
    ];
  }
}

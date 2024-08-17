import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { UserModule } from './modules/user/infraestructure/presentation/user.module';
import { RoleModule } from './modules/role/interfaces/role.module';
import { AppoinmentModule } from './modules/appoinment/infraestructure/presentation/appointment.module';
import { CourseModule } from './modules/course/infraestructure/presentation/course.module';

@Module({
  imports: [
    StudentModule,
    UserModule,
    RoleModule,
    AppoinmentModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
